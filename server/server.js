
var { addPlayer, removePlayer, deleteRoom, checkFull, queryUsers } = require('./firebaseFunctions');
var Board = require('./cards/Board');
var express = require('express');
var app = express();
var server = app.listen(5000);
const io = require('socket.io')(server)

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
        if (await checkFull(room)) {
            //countdown before game starts
            countdown(room);
        }
    });

    socket.on('play-card', () => {

    })

    /**
     * Begins dealing the initial cards to each play corresponding
     * to the type of the game. Cards are dealt in 1 second intervals.
     * @param {*} room - The room the socket is part of
     */
    const start = async (room) => {
        let playerList = await queryUsers(room);
        let board = new Board("Blackjack", playerList);
        let iterations = board.getTurns();
        var dealCards = setInterval(() => {
            iterations--;
            if (iterations == 0) {
                clearInterval(dealCards);
            } 
            io.to(room).emit('update-hands', board.dealCard());
            
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

    socket.on('disconnecting', () => {
    })

});

//static files
app.use(express.static('public'))
