import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../assets/Space.module.css'
import HostModal from '../Templates/HostModal.js'
import { Modal, Form } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import useGames from '../../hooks/useGamesListener';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { addPlayer, connectSocket } from '../Socket';


const Games = ({ room, setRoom, id }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState(null);
    const history = useHistory();
    const { games } = useGames(filter);
    const { currentUser } = useAuth();

    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);

    const handleJoin = (gameId) => {
        setRoom(gameId)
    }

    useEffect(() => {
        const data = async () => {
            if (room) {
                connectSocket(room, id);
                history.push(`/games/${room}`);
            }
        }
        data();
    }, [room])
    

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
                    <button onClick = {() => setModalOpen(true)} className = "btn btn-primary mt-2" data-toggle="modal">
                        Host
                    </button>
                </div>
            </div>
            <div className = "row mt-4">
                { games.length > 0 ? games.map((game) => 
                    game.size < game.maxPlayers ?
                    <div className = "col-6" key = {game.gameId}>
                        <motion.div className = "card border-dark mb-3"
                            layout 
                            initial={{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            >
                            <div className = "card-header">
                            <p className="text-dark h6">{game.gameId}</p>
                            </div>
                            <div className = "card-body">
                                <h4>Host: {game.host}</h4>
                                <h4>Players: {game.size}/{game.maxPlayers}</h4>
                                <div className = "text-center">
                                    <button className = "btn btn-primary" onClick = {() => handleJoin(game.gameId)}>
                                        Join
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                        <br></br>
                    </div>
                    : null
                ) : <p className = "mx-auto h5 mt-5">0 results found</p>}
            </div>
            <Modal show = {modalOpen} onHide = {closeModal}>
                <HostModal closeModal = {closeModal} setRoom = {setRoom} id = {id}/>
            </Modal>
        </div>
    )    
}

export default Games;