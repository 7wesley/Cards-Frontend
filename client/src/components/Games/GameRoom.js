import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Prompt } from 'react-router';
import Waiting from './Waiting';
import useRoomListener from '../../hooks/useRoomListener';
import useSocketListener from '../../hooks/useSocketListener';
import { getSocket } from '../Socket';
import { Button } from 'react-bootstrap';

const GameRoom = ({match, room, setRoom, id}) => {

    const { playerHands, countdown, prompt, turn, timer} = useSocketListener(id);
    const { players, maxPlayers } = useRoomListener(match.params.roomId, id, setRoom)
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currCard, setCurrCard] = useState(null);

    useEffect(() => {
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
        setLoading(true);
        getSocket().emit("player-move", choice);
    }

    const handleCardChoice = (card) => {
        setSelected(true);
        setCurrCard(card);
    }

    const renderPlayer = (player) => {
        return (
        <div className = "col-4">
            <div className = "row justify-content-center align-items-center">            
                <p>{player.name}</p>
                <div className = "d-flex justify-content-center align-items-center">   
                    { player.cards && Object.values(player.cards).map(card =>      
                        <motion.img style = {{ width: 100 }} src = {card.image} 
                            onClick = {() => handleCardChoice(card)}
                            whileHover={{
                                scale: 1.1,
                        }} />  
                    )}            
                </div>
                { selected && 
                    <>
                        <p className = "mb-0">Are you sure you want to play this card?</p>
                        <div className = "row">
                            <Button className = "mr-2" onClick = {handlePlay}>Confirm</Button>
                            <Button onClick = {() => setSelected(false)} variant="danger">Cancel</Button>
                        </div>
                    </>
                }
            </div>
        </div>
        )
    }

    const renderRows = () => {
        let rows = [];
        let columns = [];
        for (let i = 0; i < 8; i++) {
            if (Object.values(playerHands)[i])
                columns.push(<div>{renderPlayer(Object.values(playerHands)[i])}</div>);
            else if (i == Object.values(playerHands).length) 
                columns.push(<div className = "col-4">
                    { turn && 
                        <p>It is currently <span className="text-primary">{id == turn ? "YOUR" : `${turn}'s`}</span> turn</p>
                    }
                    { turn && (id == turn ? (
                        <>
                            <p>{prompt}</p>
                            <Button disabled = {loading} className = "mr-2" onClick = {() => handlePlay("draw")}>Confirm</Button>
                            <Button disabled = {loading} variant="danger" onClick = {() => handlePlay("pass")}>Pass</Button>
                        </>
                        ) : <p>Waiting for them to make their move...</p>
                    )}
                </div>)
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
                <div className = "container position-relative mt-4">
                    <div className="d-flex flex-column vh-100 text-center">
                        <div className = "mt-5 position-absolute" style = {{ right: 0 }}>
                           {timer}
                        </div>
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