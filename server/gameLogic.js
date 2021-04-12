module.exports = class GameLogic {
    
    constructor(io) {
        this.io = io;
    }

    blackjack = async (board, id, choice) => {
        const socket = this.io.sockets.sockets.get(id);
        console.log(socket.uid);
        if (choice == "draw") {
            board.dealCard(socket.uid);
            this.io.to(socket.room).emit('update-hands', board.getPlayers());
            if (board.getPlayer(socket.uid).total > 21) 
                await this.removePlayer(board, socket.id, `${socket.uid} Busts!`)
        }
        else {
            await this.removePlayer(board, socket.id, `${socket.uid} Stands!`)
        }
    }

    removePlayer = async (board, id, msg) => {
        const socket = this.io.sockets.sockets.get(id);
        this.io.to(socket.room).emit('alert', msg),
        await new Promise(resolve => setTimeout(resolve, 5000));
        board.removePlayer(socket.uid);
        this.io.to(socket.room).emit('update-hands', board.getPlayers());
        this.io.to(socket.room).emit('alert', "");
    } 
}
