
var db = require('./firebaseFunctions');
var Board = require('./cards/Board');
var express = require('express');
var app = express();
var server = app.listen(5000);
const io = require('socket.io')(server)
var GameLogic = require('./GameLogic');

let logic = new GameLogic(io);

io.on('connection', socket => {

    /**
     * Checks if the room the socket was apart of has 0 players.
     * If so, the room is deleted, else, the player is removed.
     */
    socket.on('disconnect', async () => {
        if (!io.sockets.adapter.rooms.get(socket.room)) 
            await db.deleteRoom(socket.room);
        else {
            //You don't need to remove the player if the room is deleted
            let board = io.sockets.adapter.rooms.get(socket.room).board;
            await db.removePlayer(socket.room, socket.uid);
            if (board && board.inProgress()) {
                board.removePlayer(socket.uid);
                //Refresh hands after player leaves
                io.to(socket.room).emit('update-hands', board.getPlayers());
                //Only go to the next turn if current turn user == disconnected user
                if (board.isTurn(socket.uid))
                    io.sockets.adapter.rooms.get(socket.room).timerEnd = true;
            }
        }
        console.log(`Disconnected: ${socket.id}`)
    });     
    
    /**
     * Every time a new socket is connected, it is added to 
     * the room that is passed in. If the room has met its player
     * quota, the countdown function will be called.
     */
    socket.on('join', async (room, uid) => {
        //once the socket emits join, all of the subsequent code will
        //be executed even if the socket disconnects
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
        //want to add the player to the db so it will show on the waiting screen
        await db.addPlayer(room, uid);
        socket.room = room;    
        socket.uid = uid;
        socket.game = await db.queryGame(room);
        //The last player is the host socket that runs the startup code
        if (await db.checkFull(room)) {
            //countdown before game starts
            countdown(room);
        }
    });


    /**
     * Begins dealing the initial cards to each player corresponding
     * to the type of the game. Cards are dealt in 1 second intervals.
     * @param {*} room - The room the socket is part of
     */
    const start = async (room) => {
        let playerList = await db.queryUsers(room);
        if (playerList == null) 
            return false; //exit if list couldnt be created
        let board = new Board(socket.game, playerList);
        io.sockets.adapter.rooms.get(room).board = board;
        io.sockets.adapter.rooms.get(room).timerEnd = false;
        let iterations = board.getTurns();

        var dealCards = setInterval(() => {
            try {
                board.initialDeal();
            } catch {
                console.log("Player left during initial setup")
            }
            io.to(room).emit('update-hands', board.getPlayers());
            iterations--;
            if (iterations == 0) {
                clearInterval(dealCards);
                turns(room);
            }   
        }, 700)
    }

    /**
     * Starts a countdown that will be displayed on the waiting
     * screen, and then triggers the start() function once the 
     * timer has reached 0.
     * @param {*} room - The room the socket is part of
     */
    const countdown = (room) => {
        var seconds = 3;
        var gameCountdown = setInterval(() => {
            io.to(room).emit('countdown', seconds);
            seconds--;
            if (seconds == 0) {
                clearInterval(gameCountdown);
                start(room);
            }
        }, 1000)
    }

    const turns = async (room) => {
        let board = io.sockets.adapter.rooms.get(room).board;
        let match = {};
        let player;

        //Avoids having to make the socket id displayed client side
        for (const client of io.sockets.adapter.rooms.get(room)) 
            match[io.sockets.sockets.get(client).uid] = client;

        while (board.inProgress()) {
            try {
                player = board.nextTurn();    
                //while the player is still in the game and its their turn
                while (board.isPlaying(player.id) && board.isTurn(player.id)) {
                    io.to(room).emit('curr-turn', player.id);
                    io.to(match[player.id]).emit('your-turn', getPrompt());
                    await turnTimer(room, board);
                    io.to(socket.room).emit('update-hands', board.getPlayers());
                    await gameHandler(match[player.id], board);
                }
            } catch {
                console.log("Player left during their turn")
            }
        }
        io.to(socket.room).emit('winners', board.getWinners())
        handleGameEnd(socket.room);
    }

    const turnTimer = (room, board) => {  
        let currRoom = io.sockets.adapter.rooms.get(room);
        return new Promise((resolve) => {
            let seconds = 40;
            const timer = setInterval(() => {
                seconds % 2 == 0 && io.to(room).emit('timer', seconds / 2);
                if (seconds == 0 || (currRoom && currRoom.timerEnd)) {
                    io.to(room).emit('timer', 20)
                    if (currRoom)
                        currRoom.timerEnd = false;
                    seconds == 0 && board.makeMove('pass');
                    resolve();
                    clearInterval(timer);
                }
                seconds--;
            }, 500)
        });  
    }

    /**
     * Takes the choice from a player's move and sets it to the 
     * gameChoice variable and then ends the player's turn.
     */
    socket.on('player-move', (choice) => {
        let board = io.sockets.adapter.rooms.get(socket.room).board;
        //board.makeMove(socket.uid, choice);
        board.makeMove(choice);
        io.sockets.adapter.rooms.get(socket.room).timerEnd = true;
        //we dont check the status of the move here as it would 
        //run concurrently with the timer
    })

    socket.on('play-again', async () => {
        socket.playAgain = true;
        let room = io.sockets.adapter.rooms.get(socket.room);
        //cannot do let playAgainCnt = room.playAgainCnt
        //primitives are cloned instead of referenced
        room.playAgainCnt++;
        //Setting values back to their initial states
        io.to(socket.id).emit('winners', null);
        io.to(socket.id).emit('update-hands', []);
        io.to(socket.id).emit('countdown', null);
        //Only runs if all players decide to play again
        if (room.playAgainCnt == await db.queryMax(socket.room)) {
            await db.setStatus(socket.room, 'in-progress');
            countdown(socket.room);
        }
    })

    const gameHandler = async (id, board) => {
        const currSocket = io.sockets.sockets.get(id); 
        switch (currSocket.game) {
            case "Blackjack":
                await logic.blackjack(currSocket, board);
        }
    }

    const getPrompt = () => {
        switch (socket.game) {
            case "Blackjack":
                return "Draw again for 21?";
        }
    }

    const handleGameEnd = async (room) => {
        let currRoom = io.sockets.adapter.rooms.get(room);
        if (currRoom) {
            let promises = [];
            //currRoom.board = null;
            currRoom.playAgainCnt = 0;
            for (const client of currRoom) 
                promises.push(playAgainTimer(io.sockets.sockets.get(client)));
            //waiting for all the timers to finish executing
            await Promise.all(promises);
            //only display the room to the public if a player has left
            if (currRoom.playAgainCnt != await db.queryMax(room)) {
                await db.setStatus(room, 'waiting');
            }
        }
    }

    const playAgainTimer = (client) => {
        return new Promise((resolve) => {
            let seconds = 20;
            const timer = setInterval(() => {
                io.to(client.id).emit('timer', seconds);
                //if the client disconnected, the timer reached 0, or the client played again
                if (!io.sockets.sockets.get(client.id) || seconds == 0 || client.playAgain) {
                    seconds == 0 && client.disconnect();
                    client.playAgain = false;
                    resolve();
                    clearInterval(timer);      
                }
                seconds--;
            }, 1000)
        });
    }

});

//static files
app.use(express.static('public'))

