import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Prompt } from 'react-router';
import Waiting from './Waiting';
import useRoomListener from '../../hooks/useRoomListener';
import useSocketListener from '../../hooks/useSocketListener';


const GameRoom = ({match, room, setRoom, id}) => {

    const { playerHands, countdown } = useSocketListener(id);
    const { players, maxPlayers } = useRoomListener(match.params.roomId, id, setRoom)

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

    const renderPlayer = (player) => {
        return (
        <div className = "col-4">
            <div className = "row justify-content-center align-items-center">            
                <p >{player.name}</p>
                <div className = "d-flex justify-content-center align-items-center">   
                    { player.cards && Object.values(player.cards).map(card =>      
                        <motion.img style = {{ width: 100 }} src = {card.image}
                            whileHover={{
                                scale: 1.1,
                        }} />  
                    )}
            
                </div>
            </div>
        </div>
        )
    }

    const renderRows = () => {
        let rows = [];
        let columns = [];
        for (let i = 0; i < 9; i++) {
            if (Object.values(playerHands)[i])
                columns.push(<div>{renderPlayer(Object.values(playerHands)[i])}</div>);
            else
                columns.push(<div className = "col-4 row"></div>)
            if((i + 1) % 3 === 0) {
                rows.push(<div className ="row flex-grow-1">{columns}</div>);
                columns = [];
            }
        }
        return rows;
    }

    return (
        <>
        <Prompt
            when={ true }
            message='This will exit you from the game. Are you sure?'
        />
        { room === match.params.roomId ? (
            !Object.keys(playerHands).length ? <Waiting players = {players} maxPlayers = {maxPlayers} countdown = {countdown}/> : (
                <div class = "container mt-4">
                    <div class="d-flex flex-column vh-100 text-center">
                        { renderRows() }
                    </div>
                </div>  
            )
        ) : <p>Not found</p>
        }   
        </>
    )

}

export default GameRoom;