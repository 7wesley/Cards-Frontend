module.exports = class Blackjack {
    constructor(deck) {
        this.deck = deck;
        this.playerIndex = 0;
        this.dealTurns = 2;
        this.turnIndex = 0;
    }

    initialDeal(players) {
        var card = this.deck.deal();
        var player = players[this.playerIndex];
        player.setCards(card);
        this.playerIndex++;
        if (this.playerIndex == players.length) {
            this.playerIndex = 0;
        }
        return {id: player.id, card}
    }

    nextTurn(players) {
        if (players && this.turnIndex < players.length) {
            this.turn = players[this.turnIndex].id;
            this.turnIndex++;
            if (this.turnIndex == players.length) {
                this.turnIndex = 0;
            }
        }
        else if (players) {
            this.turn = players[0].id;
            this.turnIndex = 0;
        }
        return this.turn;
    }

    dealCard(players, uid) {
        const card = this.deck.deal();
        let player = players.find(player => player.id === uid)
        player.setCards(card);
        if (player.total > 21)
            this.nextTurn();
        return {id: uid, card};
    }

    setTurn(turn) {
        this.turn = turn;
    }
    
    getTurn() {
        return this.turn;
    }

    getTurns(playerSize) {
        return playerSize * this.dealTurns;
    }


}