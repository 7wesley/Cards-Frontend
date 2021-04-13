import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Prompt } from 'react-router';
import Waiting from './Waiting';
import Winner from './Winner';
import useRoomListener from '../../hooks/useRoomListener';
import useSocketListener from '../../hooks/useSocketListener';
import { getSocket } from '../Socket';
import { Button } from 'react-bootstrap';

const GameRoom = ({match, room, setRoom, id}) => {

    const { players, countdown, prompt, turn, timer, message, winners } = useSocketListener(id);
    const { playersList, maxPlayers } = useRoomListener(match.params.roomId, id, setRoom)
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currCard, setCurrCard] = useState(null);

    useEffect(() => {
        if (turn === id)
            setLoading(false);
    }, [turn]);
    
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

    const handlePlay = (choice) => {
        //if (players.length > 1)
        //    setLoading(true);
        getSocket().emit("player-move", choice);
    }

    const handleCardChoice = (card) => {
        setSelected(true);
        setCurrCard(card);
    }

    const renderPlayer = (player) => {
        return (
        <div className = "col-4 text-center pt-3">
            <p>{id === player.id ? "You" : player.id}</p>
            <div className = "row">  
                <motion.div className = "mx-auto" layout>
                    { player.cards && Object.values(player.cards).map(card =>      
                            <motion.img className="img-fluid" style = {{ width: 100 }} src = {card.image} 
                            onClick = {() => handleCardChoice(card)}
                            whileHover={{
                                scale: 1.1,
                        }} />  
                    )}  
                </motion.div>          
            </div>
            <p className = "text-center">{player.total} {player.status === "standing" && `(${player.status})`}</p>
            { selected && 
                <>
                    {/*
                    <p className = "mb-0">Are you sure you want to play this card?</p>
                    <div className = "row">
                        <Button className = "mr-2" onClick = {handlePlay}>Confirm</Button>
                        <Button onClick = {() => setSelected(false)} variant="danger">Cancel</Button>
                    </div>
                    */}
                </>
            }
        
    </div>
        )
    }

    const renderPrompt = () => {
        return (
            <div className = "col-4 pt-5">
                { (!message && turn) && 
                    <p>It is currently <span className="text-primary">{id == turn ? "YOUR" : `${turn}'s`}</span> turn</p>
                }
                { (!message && turn) && (id == turn ? (
                    <>
                        <p>{prompt}</p>
                        <Button disabled = {loading} className = "mr-2" onClick = {() => handlePlay("draw")}>Confirm</Button>
                        <Button disabled = {loading} variant="danger" onClick = {() => handlePlay("pass")}>Pass</Button>
                    </>
                    ) : <p>Waiting for them to make their move...</p>
                )}
                {<p className = "h2">{message}</p>}
            </div>
        )
    }

    const renderRows = () => {
        let rows = [];
        let columns = [];
        for (let i = 0; i < 9; i++) {
            if (players[i])
                columns.push(renderPlayer(players[i]));
            else if (i == players.length) {
                columns.push(renderPrompt());
            }
            else
                columns.push(<div className = "col-4"></div>)
            if((i + 1) % 3 === 0) {
                rows.push(<div className ="row h-100">{columns}</div>);
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
            !winners && players.length ? (
                <div className = "container position-relative mt-4">
                    <div className="d-flex flex-column vh-100 text-center">
                        <div className = "mt-5 position-absolute" style = {{ right: 0 }}>
                           {timer}
                        </div>
                        { renderRows() }
                    </div>
                </div>  
            ) : winners ? 
                <Winner id = {id} winners = {winners} /> 
                : <Waiting id = {id} players = {playersList} maxPlayers = {maxPlayers} countdown = {countdown}/>
        ) : <p>Not found</p>
        }   
        </>
    )

}

export default GameRoom;