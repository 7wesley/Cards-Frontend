var Card = require('./Card');
module.exports = class Deck {
    
    constructor() {
        const suits = ['H', 'S', 'C', 'D'];
        const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
        this.cards = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(suit, rank))
            }
        }
        this.shuffle();
    }

    //Fisher-Yates Shuffle
    shuffle() {
        const cards = this.cards;
        let m = cards.length, i;
        while (m) {
          i = Math.floor(Math.random() * m--);
      
          [cards[m], cards[i]] = [cards[i], cards[m]];
        }
        return this;
      }

    deal() {
        return this.cards.pop();
    }

    toString() {
        var total = ``;
        for (const card of this.cards) {
            total += " " + card.suit + card.rank;
        }
        return total;
    }      
}