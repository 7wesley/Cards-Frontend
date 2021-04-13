
var { addPlayer, removePlayer, deleteRoom, checkFull, queryUsers, queryGame } = require('./firebaseFunctions');
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
            await deleteRoom(socket.room);
        else {
            //You don't need to remove the player if the room is deleted
            let board = io.sockets.adapter.rooms.get(socket.room).board;
            await removePlayer(socket.room, socket.uid);
            board.removePlayer(socket.uid);
            //Refresh hands after player leaves
            io.to(socket.room).emit('update-hands', board.getPlayers());
            //Only go to the next turn if current turn user == disconnected user
            if (board.isTurn(socket.uid))
                io.sockets.adapter.rooms.get(socket.room).timerEnd = true;
        }
        console.log(`Disconnected: ${socket.id}`)
    });     
    
    /**
     * Every time a new socket is connected, it is added to 
     * the room that is passed in. If the room has met its player
     * quota, the countdown function will be called.
     */
    socket.on('join', async (room, uid) => {
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
        //want to add the player to the db so it will show on the waiting screen
        await addPlayer(room, uid);
        socket.room = room;    
        socket.uid = uid;
        socket.game = await queryGame(room);
        //The last player is the host socket that runs the startup code
        if (await checkFull(room)) {
            //countdown before game starts
            countdown(room);
        }
    });

    /**
     * Takes the choice from a player's move and sets it to the 
     * gameChoice variable and then ends the player's turn.
     */
    socket.on('player-move', (choice) => {
        let board = io.sockets.adapter.rooms.get(socket.room).board;
        //board.makeMove(socket.uid, choice);
        board.makeMove(choice);
        io.sockets.adapter.rooms.get(socket.room).timerEnd = true;
        //Not optimal ----> await gameHandler(choice)
        //the issue with handling game logic here is that the
        //timer continues to countdown while the logic is 
        //executing. You want to stop the timer and essentially 
        //wait for all logic to finish before going to the next player
    })

    /**
     * Begins dealing the initial cards to each player corresponding
     * to the type of the game. Cards are dealt in 1 second intervals.
     * @param {*} room - The room the socket is part of
     */
    const start = async (room) => {
        let playerList = await queryUsers(room);
        let board = new Board(socket.game, playerList);
        io.sockets.adapter.rooms.get(room).board = board;
        io.sockets.adapter.rooms.get(room).timerEnd = false;
        let iterations = board.getTurns();

        var dealCards = setInterval(() => {
            board.initialDeal();
            io.to(room).emit('update-hands', board.getPlayers());
            iterations--;
            if (iterations == 0) {
                clearInterval(dealCards);
                turns(room);
            }   
        }, 1000)
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
                //console.log(player.id);        
                //while the player is still in the game and its their turn
                while (board.isPlaying(player.id) && board.isTurn(player.id)) {
                    io.to(room).emit('curr-turn', player.id);
                    io.to(match[player.id]).emit('your-turn', getPrompt());
                    await turnTimer(room, board);
                    io.to(socket.room).emit('update-hands', board.getPlayers());
                    await gameHandler(match[player.id], board);
                }
            } catch (e) {
                console.log(e);
            }
        }
        
        io.to(socket.room).emit('winners', board.getWinners())
    }

    const turnTimer = (room, board) => {  
        return new Promise((resolve) => {
            let seconds = 40;
            const timer = setInterval(() => {
                seconds % 2 == 0 && io.to(room).emit('timer', seconds / 2);
                if (seconds == 0 || io.sockets.adapter.rooms.get(room).timerEnd) {
                    io.to(room).emit('timer', 20)
                    io.sockets.adapter.rooms.get(room).timerEnd = false;
                    seconds == 0 && board.makeMove('pass');
                    resolve();
                    clearInterval(timer);
                }
                seconds--;
            }, 500)
        });
        
    }

    const gameHandler = async (id, board) => {
        const currSocket = io.sockets.sockets.get(id); 
        switch (currSocket.game) {
            case "Blackjack":
                await logic.blackjack(currSocket, board);
        }
    }

    const getPrompt = () => {
        let stats;
        switch (socket.game) {
            case "Blackjack":
                return "Draw again for 21?";
        }
    }

});

//static files
app.use(express.static('public'))

