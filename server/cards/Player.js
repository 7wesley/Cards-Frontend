module.exports = class Player {
    constructor(id) {
        this.id = id;  
        this.cards = [];
        this.status = "Playing"
        this.total = 0;
    }
    
    setCards(card) {
        this.cards.push(card);
        this.total += card.value;
    }

    get allCards() {
        return this.cards;
    }

    set currentStatus(status) {
        this.status = status;
    }

}