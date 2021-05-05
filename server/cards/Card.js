let Ranks = require('./Ranks');

/**
 * Represents a single card in a deck.
 */
module.exports = class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.value = Ranks[rank];
        this.image = `/Images/Cards/${rank}${suit}.png` 
    }

}
