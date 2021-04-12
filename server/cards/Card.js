let Ranks = require('./Ranks');
module.exports = class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.value = Ranks[rank];
        this.image = `/Images/Cards/${rank}${suit}.png` 
    }

}
