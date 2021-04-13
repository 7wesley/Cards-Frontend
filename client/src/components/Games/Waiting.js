import styles from '../../assets/Transitions.module.css'
import { motion } from 'framer-motion';
const Waiting = ({ id, players, maxPlayers, countdown }) => {
    return (
        <div className = {styles.bgWaiting}>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center" >
                <div className="text-center text-light">
                    { countdown ? (
                        <>
                            <p className = "h6"> Game starting in </p>
                            <motion.p
                                animate={{
                                    rotate: 360
                                }}
                                className = "h6"> { countdown }
                             </motion.p> 
                        </>
                    )
                    : ( 
                        <>
                            <p className = "h3">Waiting for players... </p>
                            <p className = "h3 mb-4">({Object.keys(players).length} out of {maxPlayers})</p>
                            <p className = "h4">Players in room:</p> 
                            <motion.div layout>
                                { Object.keys(players).map(player => (
                                    <p className = "mb-0"> { player } {id === player && "(You)"}</p>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Waiting;