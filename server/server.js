
var { addPlayer, removePlayer, deleteRoom, checkFull, queryUsers, queryGame } = require('./firebaseFunctions');
var { blackjack } = require('./gameLogic');
var Board = require('./cards/Board');
var express = require('express');
var app = express();
var server = app.listen(5000);
const io = require('socket.io')(server)


let timerEnd = false;

io.on('connection', socket => {

    /**
     * Checks if the room the socket was apart of has 0 players.
     * If so, the room is deleted, else, the player is removed.
     */
    socket.on('disconnect', async () => {
        if (!io.sockets.adapter.rooms.get(socket.room)) 
            await deleteRoom(socket.room);
        else {
            //We don't need to remove the player if the room is deleted
            await removePlayer(socket.room, socket.uid);
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
        //want to assign socket a room variable so we can check
        //the room size once they leave. This is useful for room deletion.
        socket.room = room;    
        socket.uid = uid;
        socket.game = await queryGame(room);
        socket.hand = [];
        if (await checkFull(room)) {
            //countdown before game starts
            countdown(room);
        }
    });

    /**
     * 
     */
    socket.on('player-move', (choice) => {
        console.log(socket.hand);
        switch (socket.game) {
            case "Blackjack":
                if (choice == "draw") {
                    let card = io.sockets.adapter.rooms.get(socket.room).board.dealCard();
                    io.to(socket.room).emit('update-hands', {id: socket.uid, card});
                }
        }
        timerEnd = true;
    })

    /**
     * Begins dealing the initial cards to each play corresponding
     * to the type of the game. Cards are dealt in 1 second intervals.
     * @param {*} room - The room the socket is part of
     */
    const start = async (room) => {
        let playerList = await queryUsers(room);
        let board = new Board(socket.game, playerList);

        io.sockets.adapter.rooms.get(room).board = board;

        let iterations = board.getTurns();
        let boardCard;
        var dealCards = setInterval(() => {
            boardCard = board.initialDeal();
            if (boardCard.id === socket.uid) 
                socket.hand.push(boardCard.card)
            io.to(room).emit('update-hands', boardCard);
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
            if (seconds == 0) {
                clearInterval(gameCountdown);
                start(room);
            }
            seconds--;
        }, 1000)
    }

    const turns = async (room) => {
        let users;
        try {
            while (true) {
                users = io.sockets.adapter.rooms.get(room);
                for (const user of users) {
                    console.log(user);
                    io.to(room).emit('curr-turn', io.sockets.sockets.get(user).uid)
                    io.to(user).emit('your-turn', getPrompt());
                    await turnTimer(room);
                }
            }
        } catch {
            console.log("All users have disconnected");
        }
    }

    const turnTimer = (room) => {  
        return new Promise((resolve) => {
            let seconds = 30;
            const timer = setInterval(() => {
                console.log(seconds);
                io.to(room).emit('timer', seconds);
                if (timerEnd || seconds == 0) {
                    console.log('Ended');
                    timerEnd = false;
                    resolve();
                    clearInterval(timer);
                }
                seconds--;
            }, 1000)
        });
        
    }

    const getPrompt = () => {
        let stats;
        switch (socket.game) {
            case "Blackjack":
                return "Draw again for 21?";
        }
    }

    socket.on('disconnecting', () => {
    })

});

//static files
app.use(express.static('public'))
