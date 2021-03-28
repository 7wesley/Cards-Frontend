export class Blackjack {
    deal(deck, players) {
        //Deal 1 card to each player 2 times
        for (var i = 0; i < 2; i++) {
            for (const player of players) {
                player.allCards = deck.pop();
            }
        }
    }
}