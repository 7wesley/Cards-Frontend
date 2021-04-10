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

    startGame() {
        if (this.game === 'Blackjack') {
            this.game = new Blackjack(this.deck.cards, this.players);
        }
        return false;  
    }

    getAllPlayers() {
        return this.players;
    }

    getPlayerCards(socket_id) {
        return this.players[socket_id].allCards;
    }

    getTurns() {
        if (this.game)
            return this.game.turns;
        return null;
    }

    initialDeal() {
        return this.game.initialDeal();
    }
    
    dealCard() {
        return this.game.dealCard();
    }
}