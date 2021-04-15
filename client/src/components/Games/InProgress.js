import styles from '../../assets/Transitions.module.css'
import { motion } from 'framer-motion';
const InProgress = ({ playersList }) => {
    return (
        <div className = {styles.bgInProgress}>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center" >
                <div className="text-center text-light">

                    <p className = "h3">This game is in progress...</p>
                    <p className = "h6">If a player leaves, you will be able to join when the game ends</p>
                    <p className = "h4 mt-4">Players currently in room:</p> 
                    <motion.div layout>
                        { Object.keys(playersList).map(player => (
                            <p className = "mb-0"> { player } </p>
                        ))}
                    </motion.div>
    
          
                </div>
            </div>
        </div>
    )
}

export default InProgress;