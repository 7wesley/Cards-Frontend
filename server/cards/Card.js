/**
 * For creating a card simulated in the card games
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

let Ranks = require("./Ranks");

/**
 * Represents a single card in a deck.
 */
module.exports = class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.value = Ranks[rank];
        this.image = `/Images/Cards/${rank}${suit}.png`;
    }
};
