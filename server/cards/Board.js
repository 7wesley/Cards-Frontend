var Deck = require('./Deck');
var Player = require('./Player');
var Blackjack = require('./Blackjack');
var { queryUsers } = require("../firebaseFunctions");

module.exports = class Board {
    constructor(game, players) {
        this.deck = new Deck();     
        this.game = game;
        this.players = players;
    }

    startGame() {
        if (this.game === 'Blackjack') {
            var blackjack = new Blackjack();
            blackjack.deal(this.deck.cards, this.players);
        }
        return false;  
    }

    getPlayers() {
        return this.players;
    }

}