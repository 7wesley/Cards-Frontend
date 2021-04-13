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
            this.turn = players[this.turnIndex];
            this.turnIndex++;
            if (this.turnIndex == players.length) {
                this.turnIndex = 0;
            }
        }
        else if (players) {
            this.turn = players[0];
            this.turnIndex = 0;
        }
        return this.turn;
    }

    dealCard() {
        const card = this.deck.deal();
        this.turn.setCards(card);
        if (this.turn.getTotal() > 21)
            this.turn.setStatus("busted");
    }

    makeMove(choice) {
        //if (this.turn === player) {
        if (choice === "draw")
            this.dealCard();
        else 
            this.turn.setStatus("standing");
        //}
        //else 
        //    console.log("Request doesnt match current turn");
    }
    
    getTurn() {
        return this.turn;
    }

    getTurns(playerSize) {
        return playerSize * this.dealTurns;
    }

    findWinners(players) {
        let highest = Math.max(...players.map(player => player.getTotal()), 0);
        return players.filter(player => player.getTotal() === highest)
    }

}