var Deck = require('./Deck');
var Player = require('./Player');
var Blackjack = require('./Blackjack');
var { queryUsers } = require("../firebaseFunctions");

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

    setTurn(turn) {
        this.game.setTurn(turn);
    }

    getTurn() {
        return this.game.turn;
    }
    
    isTurn(uid) {
        return this.game.getTurn() === uid;
    }

    nextTurn() {
        return this.game.nextTurn(this.players);
    }

    startGame() {
        if (this.game === 'Blackjack') {
            this.game = new Blackjack(this.deck);
        }
        return false;  
    }

    removePlayer(uid) {
        this.players = this.players.filter(player => player.id !== uid);
    }

    getPlayers() {
        return this.players;
    }

    getPlayer(uid) {
        return this.players.find(player => player.id === uid);
    }

    getTurns() {
        return this.game.getTurns(this.players.length);
    }

    initialDeal() {
        return this.game.initialDeal(this.players);
    }

    dealCard(uid) {
        return this.game.dealCard(this.players, uid);
    }
}