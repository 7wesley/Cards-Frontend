export class Player {
    constructor(name) {
        this.playerName = name;  
        this.cards = [];
        this.status = "Playing"
    }

    
    set allCards(card) {
        this.cards.push(card);
    }
    

    set currentStatus(status) {
        this.status = status;
    }
}