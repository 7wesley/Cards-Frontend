import { Deck } from "./Deck"
import { Player } from "./Player"
import { Blackjack } from "./Blackjack"

export class Board {
    constructor(game, players, deck) {
        if (!deck) 
            this.deck = new Deck();     
        else 
            this.deck = deck;      
        this.game = game;
        this.players = [];
        for (const player of players) {
            this.players.push(new Player(player.name))
        }
    }

    startGame() {
        if (this.game === 'Blackjack') {
            var blackjack = new Blackjack();
            blackjack.deal(this.deck.cards, this.players);
        }
        return false;  
    }

}