import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Prompt } from 'react-router';
import Waiting from './Waiting';
import useRoomListener from '../../hooks/useRoomListener';
import useSocketListener from '../../hooks/useSocketListener';


const GameRoom = ({match, room, setRoom, id}) => {

    const { cards, otherCards } = useSocketListener(id);
    const { players, full, maxPlayers } = useRoomListener(match.params.roomId, id, setRoom)
    
    useEffect(() => {
        if (cards)
            console.log(cards);
    }, [cards])


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
            cards == null ? <Waiting players = {players} maxPlayers = {maxPlayers}/> : (
            <div class = "container-fluid">
                <div class="d-flex flex-column vh-100 text-center">
                    <div class="row flex-grow-1">
                        <div class = "col-3">flex </div>
                        <div class = "col-6">
                        <div className = "h-100">
                                <div className = "row h-100 justify-content-center align-items-center">                 
                                <p> All other player cards</p>   
                                { otherCards && Object.values(otherCards).map(player => 
                                    player.cards.map(card =>        
                                        <motion.img style = {{ width: 150 }} src = {card.image}
                                            whileHover={{
                                                scale: 1.1,
                                        }} />  
                                    ))
                                }
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
                        <div class = "col-3">flex</div>
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