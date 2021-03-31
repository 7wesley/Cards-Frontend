/*
import React, { useState, useEffect } from 'react';
import { Deck } from './Deck';
import { Board } from './Board';
import { motion } from 'framer-motion';

const Layout = () => {
    
    let deck = new Deck();
    let board = new Board("Blackjack", [{name: 'test'}, {name: 'dealer'}], deck);
    const [cards, setCards] = useState(null);
    const [dealerCards, setDealerCards] = useState(null);
    
    useEffect(() => {
        board.startGame();
        setCards(board.players[0].cards);
        setDealerCards(board.players[1].cards);
    }, [])
    
    return (
        <div class = "container-fluid">
            <div class="d-flex flex-column vh-100 text-center">
                <div class="row flex-grow-1">
                    <div class = "col-3">flex </div>
                    <div class = "col-6">
                    <div className = "h-100">
                            <div className = "row h-100 justify-content-center align-items-center">
                                { dealerCards && dealerCards.map(card =>
                                    <motion.img style = {{ width: 150 }} className = "" src = {card.image}
                                        whileHover={{
                                            scale: 1.1,
                                        }} />
                                )}
                            </div>
        
                        </div>   
                    </div>
                    <div class = "col-3">flex </div>
                </div>
                <div class="row flex-grow-1">
                    <div class = "col-3">flex</div>
                    <div class = "col-6">
                        <div className = "h-100">
                            <div className="row h-100 justify-content-center align-items-center">
                                <img style = {{ width: 150 }} className = "" src = "Images/Cards/back.png" />
                            </div>
                        </div>
                    </div>
                    <div class = "col-3">flex </div>
                </div>
                <div class="row flex-grow-1">
                    <div class = "col-3">flex </div>
                    <div class = "col-6">
                        <div className = "h-100">
                            <div className = "row h-100 justify-content-center align-items-center">
                                { cards && cards.map(card =>
                                    
                                    <motion.img style = {{ width: 150 }} src = {card.image}
                                        whileHover={{
                                            scale: 1.1,
                                    }} />
                                    
                                )}
                            </div>
                        </div>     
                    </div>
                    <div class = "col-3">flex </div>
                </div>

            </div>
        </div>

    )
}

export default Layout;
*/