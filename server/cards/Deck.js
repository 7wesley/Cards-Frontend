/**
 * Manages a deck of cards
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

var Card = require("./Card");
/**
 * Represents a deck of cards
 */
module.exports = class Deck {
    constructor() {
        const suits = ["H", "S", "C", "D"];
        const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
        this.cards = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
        this.shuffle();
    }

    /**
     * Performs a Fisher-Yates shuffle of the cards in the cards field.
     */
    shuffle() {
        const cards = this.cards;
        let m = cards.length,
            i;
        while (m) {
            i = Math.floor(Math.random() * m--);

            [cards[m], cards[i]] = [cards[i], cards[m]];
        }
    }

    /**
     * Deals a single card from the cards field.
     * @returns - The top card of the deck
     */
    deal() {
        return this.cards.pop();
    }

    /**
     * Formats the cards in a user readable string.
     * @returns - A string representing all the cards in the deck
     */
    toString() {
        var total = ``;
        for (const card of this.cards) {
            total += " " + card.suit + card.rank;
        }
        return total;
    }
};
