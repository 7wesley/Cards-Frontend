/**
 *Creates and manages a game of Blackjack
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

module.exports = class Blackjack {
    constructor(deck) {
        this.deck = deck;
        this.playerIndex = 0;
        this.dealTurns = 2;
        this.turnIndex = 0;
    }

    /**
     * The initial dealing of the cards. Deals one card at a time.
     * @param {*} players - The player that are part of the game
     * @returns - The player that was dealt to and the card that was
     * drawn from the deck
     */
    initialDeal(players) {
        var card = this.deck.deal();
        var player = players[this.playerIndex];
        player.setCards(card);
        this.playerIndex++;
        if (this.playerIndex == players.length) {
            this.playerIndex = 0;
        }
        return { id: player.id, card };
    }

    /**
     * Determines who's turn it currently is and uses that
     * information to get the next player's turn and return it.
     * @param {*} players - The players currently in the game
     * @returns - The numeric representation of who's turn it is
     */
    nextTurn(players) {
        if (players && this.turnIndex < players.length) {
            this.turn = players[this.turnIndex];
            this.turnIndex++;
            if (this.turnIndex == players.length) {
                this.turnIndex = 0;
            }
        } else if (players) {
            this.turn = players[0];
            this.turnIndex = 0;
        }
        return this.turn;
    }

    /**
     * Gets the next card from the top of the deck and
     * deals it to the user who's turn it currently is.
     */
    dealCard() {
        const card = this.deck.deal();
        this.turn.setCards(card);
        if (this.turn.getTotal() > 21) this.turn.setStatus("busted");
    }

    /**
     * Deals a card if a user draws, otherwise sets
     * their status to standing.
     * @param {*} choice - The choice a user makes on
     * their move.
     */
    makeMove(choice) {
        if (choice === "draw") this.dealCard();
        else this.turn.setStatus("standing");
    }

    /**
     * Returns the turn field
     * @returns - The turn field
     */
    getTurn() {
        return this.turn;
    }

    /**
     * Returns the number of turns needed for the initial
     * deal.
     * @param {*} playerSize - The number of players part of the game
     * @returns - The number of turns needed for the initial deal.
     */
    getTurns(playerSize) {
        return playerSize * this.dealTurns;
    }

    /**
     * Searches for users who haven't busted and have the highest card total
     * of all users. In the event of a tie, multiple users can be returned
     * @param {*} players - The players currently part of the game
     * @returns - The players who won
     */
    findWinners(players) {
        let highest = Math.max(
            ...players.map((player) => player.getTotal()),
            0
        );
        return players.filter((player) => player.getTotal() === highest);
    }
};
