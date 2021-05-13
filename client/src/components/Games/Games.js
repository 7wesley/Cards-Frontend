/**
 * This is the "lobby" of the website. It displays the current games that are in session
 *  and allows the user to create a gameroom to play a match
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState, useCallback } from 'react';
import styles from '../../assets/Space.module.css'
import HostModal from '../Templates/HostModal.js'
import { Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useGames from '../../hooks/useGamesListener';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

/**
 * The class that will allow the user to create and join games
 * @param {any} id the id of the player that accesses this page
 * @returns the Game page that shows the current games
 */
const Games = ({ id }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState(null);
    const { games } = useGames(filter);
    const { currentUser } = useAuth();

    /**
     * Closes the HostModal if the user backs out
     */
    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);

    return (
        <div className={"container position-relative " + styles.headerSpace}>
            <div>
            <Form onChange = {(e) => setFilter(e.target.value)} className = "position-absolute d-none d-lg-block" style = {{ right: 0 }}>
                <Form.Control className = "mt-2" type = "text" placeholder = "Find room or user ID 🔍" />
            </Form>
         
            </div>
            <div className = "text-center d-flex"> 
                <div className = "mx-auto">
                    <p className = "h5">Welcome, {id}</p>
                    {!currentUser && <p className = "h5">Want more features? <Link to = '/login'>Create an account</Link></p>}

                    {/*Opens the hostModal class when this host button is clicked*/}
                    <button onClick = {() => setModalOpen(true)} className = "btn btn-primary mt-2" data-toggle="modal">
                        Host
                    </button>
                </div>
            </div>
            <div className = "row mt-4">
                { games.length ? games.map((game) => 
                    game.status === 'waiting' && 
                    <div className = "col-6" key = {game.gameId}>
                        <motion.div className = "card border-dark mb-3" layout 
                            initial={{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                        >
                            <div className = "card-header">
                                <p className="text-dark h6">{game.gameId}</p>
                            </div>

                            {/*Shows the host and the current number of players of 
                            each gameroom*/}
                            <div className = "card-body">
                                <h4>Host: {game.host}</h4>
                                <h4>Players: {Object.keys(game.players).length}/{game.maxPlayers}</h4>
                                <div className = "text-center">
                                    <Link to = {'/games/' + game.gameId} className = "btn btn-primary">Join</Link>
                                </div>
                            </div>

                        </motion.div>
                        <br></br>
                    </div>
                ) : <p className = "mx-auto h5 mt-5">No games found</p>}
            </div>

            {/*Finds if the user wants to open the HostModal class*/}
            <Modal show = {modalOpen} onHide = {closeModal}>
                <HostModal closeModal = {closeModal} id = {id}/>
            </Modal>
        </div>
    )    
}

export default Games;