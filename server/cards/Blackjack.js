module.exports = class Blackjack {
    constructor(deck, players) {
        this.deck = deck;
        this.players = players;
        this.playerIndex = 0;
        this.dealTurns = 2;
    }

    initialDeal() {
        var card = this.deck.pop();
        var player = this.players[this.playerIndex];
        this.playerIndex++;
        if (this.playerIndex == this.players.length) {
            this.playerIndex = 0;
        }
        return {id: player.id, card}
    }

    dealCard() {
        return this.deck.pop();
    }

    get turns() {
        return this.players.length * this.dealTurns;
    }


}