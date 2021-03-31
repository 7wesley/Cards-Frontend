
var { addPlayer, removePlayer, checkSize, checkFull, queryUsers } = require('./firebaseFunctions');
var Board = require('./cards/Board');
var express = require('express');
var app = express();
var server = app.listen(5000);
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('disconnect', async () => {
        await removePlayer(socket.room, socket.uid);
        await checkSize(socket.room);
        console.log(`Disconnected: ${socket.id}`)
    });     

    socket.on('join', async (room, uid) => {
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
        socket.uid = uid;
        socket.room = room;
        await addPlayer(room, uid);
        if (await checkFull(room)) {
            console.log("Room full!");
            let playerList = await queryUsers(room);
            let board = new Board("Blackjack", playerList);
            board.startGame();
            let playerCards = board.getPlayers();
            console.log(playerCards)
            io.to(room).emit('begin-game', playerCards);
        }
        
    });

    socket.on('disconnecting', () => {
    })

});

//static files
app.use(express.static('public'))
