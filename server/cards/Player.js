module.exports = class Player {
    constructor(id) {
        this.id = id;  
        this.cards = [];
        this.status = "Playing"
    }
    
    set allCards(card) {
        this.cards.push(card);
    }

    get allCards() {
        return this.cards;
    }

    set currentStatus(status) {
        this.status = status;
    }

}