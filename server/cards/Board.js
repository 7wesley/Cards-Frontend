var Deck = require('./Deck');
var Player = require('./Player');
var Blackjack = require('./Blackjack');

module.exports = class Board {

    constructor(game, players) {
        this.deck = new Deck();     
        this.game = game;
        this.players = [];
        for (const [index, [, value]] of Object.entries(Object.entries(players))) {
            this.players[index] = new Player(players[value]);
        }
        this.startGame();
    }

    startGame() {
        if (this.game === 'Blackjack') {
            this.game = new Blackjack(this.deck);
        }
        return false;  
    }

    makeMove(choice) {
        //let player = this.players.find(player => player.id === uid);
        this.game.makeMove(choice);
    }

    initialDeal() {
        return this.game.initialDeal(this.players);
    }

    isTurn(uid) {
        return this.game.getTurn().getId() === uid;
    }

    nextTurn() {
        return this.game.nextTurn(this.players);
    }

    removePlayer(uid) {
        this.players = this.players.filter(player => player.id !== uid);
    }

    getPlayers() {
        return this.players;
    }

    isPlaying(uid) {
        let player = this.players.find(player => player.id === uid);
        return player && player.getStatus() === "playing";
    }

    inProgress() {
        let playing = this.players.filter(player => player.getStatus() === "playing")
        return playing.length !== 0;
    }

    getPlayer(uid) {
        return this.players.find(player => player.id === uid);
    }

    getTurns() {
        return this.game.getTurns(this.players.length);
    }

    getWinners() {
        return this.game.findWinners(this.players);
    }
}