module.exports = class GameLogic {
    

    constructor(io) {
        //This class is shared between all rooms so a socket can
        //not be set as a field. Instead it will be passed in to the functions.
        this.io = io;
    }

    blackjack = async (socket, board) => {
        if (board.getPlayer(socket.uid).getStatus() === "busted") {
            await this.removePlayer(socket, board, `${socket.uid} Busts!`);
        }
        else if (board.getPlayer(socket.uid).getStatus() === "standing") {
            await this.alert(socket, `${socket.uid} Stands!`);
        }
        
        this.io.to(socket.room).emit('update-hands', board.getPlayers());
    }

    alert = async (socket, msg) => {
        this.io.to(socket.room).emit('alert', msg),
        await new Promise(resolve => setTimeout(resolve, 3000));
        this.io.to(socket.room).emit('alert', "");
    } 

    removePlayer = async (socket, board, msg) => {
        this.io.to(socket.room).emit('alert', msg),
        await new Promise(resolve => setTimeout(resolve, 3000));
        board.removePlayer(socket.uid);
        this.io.to(socket.room).emit('alert', "");
    } 
}
