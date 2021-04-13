module.exports = class Player {
    constructor(id) {
        this.id = id;  
        this.cards = [];
        this.total = 0;
        this.status = "playing";
    }
    
    setCards(card) {
        this.cards.push(card);
        this.total += card.value;
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getId() {
        return this.id;
    }

    getTotal() {
        return this.total;
    }

    get allCards() {
        return this.cards;
    }

    set currentStatus(status) {
        this.status = status;
    }

}