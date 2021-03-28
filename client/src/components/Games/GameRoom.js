import React, {useState, useEffect} from 'react';
import { Deck } from './Deck';
import { Board } from './Board';
import { motion } from 'framer-motion';
import { Prompt } from 'react-router';
import Waiting from './Waiting';
import useRoomListener from '../../hooks/useRoomListener';


const GameRoom = ({match, room, setRoom, id}) => {

    let deck = new Deck();
    let board = new Board("Blackjack", [{name: 'test'}, {name: 'dealer'}], deck);
    const [cards, setCards] = useState(null);
    const [dealerCards, setDealerCards] = useState(null);
    const { players, full, maxPlayers } = useRoomListener(match.params.roomId, id, setRoom)
    
    useEffect(() => {
        if (Object.keys(players).length == maxPlayers) {
            console.log(players);
            console.log(maxPlayers);
            board.startGame();
            setCards(board.players[0].cards);
            setDealerCards(board.players[1].cards);
        }
    }, [players])


    //make separate component
    const handleChat = () => {
        /*
        setOpened(!opened)
        if (opened == true) {
            document.getElementById("chatBox").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }
        else{
            document.getElementById("chatBox").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
        */
    }

    return (
        <>
        <Prompt
            when={ true }
            message='This will exit you from the game. Are you sure?'
        />
        { room === match.params.roomId ? (
            Object.keys(players).length != maxPlayers ? <Waiting players = {players} maxPlayers = {maxPlayers}/> : (
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
        ) : <p>Not found</p>
        }   
        </>
    )

}

export default GameRoom;