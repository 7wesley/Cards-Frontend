import React, {useState} from 'react';

export class Card {

    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.image = `/Images/Cards/${rank}${suit}.png` 
    }

}
