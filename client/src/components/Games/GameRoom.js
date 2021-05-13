/**
 * Manages and creates the card match that players interact with
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Prompt } from 'react-router';
import Waiting from './Waiting';
import Winner from './Winner';
import InProgress from './InProgress';
import NotFound from './NotFound';
import useRoomListener from '../../hooks/useRoomListener';
import useSocketListener from '../../hooks/useSocketListener';
import { getSocket, connectSocket } from '../Socket';
import { Button } from 'react-bootstrap';

/**
 * The page that users play games
 * @param {any} match contains the match of this gameroom
 * @param {any} userData the user's information 
 * @param {any} updateStorage for updating storing information
 * @returns The webpage this class creates
 */
const GameRoom = ({match, userData, updateStorage}) => {

    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false)
    const { playersList, maxPlayers, status } = useRoomListener(match.params.roomId);
    const { players, countdown, prompt, turn, timer, message, winners } = useSocketListener(connected);
    const id = userData && userData.username;

    useEffect(() => {
        //if the room is open and they aren't already connected:
        if (status === "waiting" && !connected) {
            connectSocket(match.params.roomId, id);
            setConnected(true);
        }
    }, [status, connected, match.params.roomId, id])
    
    useEffect(() => {
        if (turn === id)
            setLoading(false);
    }, [turn, id]);

    /**
     * Takes care of the decision made by the player
     * @param {*} choice the decision of the player for their turn
     */
    const handlePlay = (choice) => {
        getSocket().emit("player-move", choice);
    }

    /**
     * Displays the player and their cards on screen
     * @param {*} player the player to render
     * @returns displays the players that are currently playing in this room
     */
    const renderPlayer = (player) => {
        return (
        <div className = "col-4 text-center pt-3">
            <p>{id === player.id ? "You" : player.id}</p>
            <div className = "row">  
                <motion.div className = "mx-auto" layout>
                    { player.cards && Object.values(player.cards).map(card =>      
                            <motion.img className="img-fluid" style = {{ width: 100 }} src = {card.image}
                            whileHover={{
                                scale: 1.1,
                        }} />  
                    )}  
                </motion.div>          
            </div>
            <p className = "text-center">{player.total} {player.status === "standing" && `(${player.status})`}</p>
    </div>
        )
    }

    /**
     * Handles displaying the "pass" and "confirm" buttons and for finding
     *  which button the user clicked. 
     * @returns Shows the buttons that the player can click to make a decision
     *          for their turn
     */
    const renderPrompt = () => {
        return (
            <div className = "col-4 pt-5">
                { (!message && turn) && 
                    <p>It is currently <span className="text-primary">{id === turn ? "YOUR" : `${turn}'s`}</span> turn</p>
                }
                { (!message && turn) && (id === turn ? (
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

    /**
     * Creates a display for each player that shows who is playing the game.
     * @returns The row of players that will be displayed
     */
    const renderRows = () => {
        let rows = [];
        let columns = [];
        for (let i = 0; i < 9; i++) {
            if (players[i])
                columns.push(renderPlayer(players[i]));
            else if (i === players.length) {
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
            when={ connected && !winners }
            message='This will exit you from the game. Are you sure?'
        />

        { playersList ? (
            status === "in-progress" && !connected ? <InProgress playersList = {playersList} /> :
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
                <Winner userData = {userData} winners = {winners} timer = {timer} updateStorage = {updateStorage} /> 
                : <Waiting id = {id} playersList = {playersList} maxPlayers = {maxPlayers} countdown = {countdown}/> 
                
        ) : <NotFound />
        } 
        </>
    )

}

export default GameRoom;