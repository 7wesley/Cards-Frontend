
var { addPlayer, removePlayer, checkSize } = require('./firebaseFunctions');
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
    });

    socket.on('disconnecting', () => {
    })

});

//static files
app.use(express.static('public'))
