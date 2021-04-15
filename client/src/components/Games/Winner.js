import styles from '../../assets/Transitions.module.css'
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getSocket } from '../Socket';
const Winner = ({ id, winners, timer }) => {
    
    const socket = getSocket();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        timer == 0 && setLoading(true);
    }, [timer]);

    const handlePlayAgain = () => {
        socket.emit('play-again');
    }

    return (
        <div className = {styles.bgInProgress}>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center" >
                <div className="text-center text-light">
                    { winners.length ? winners.map(winner =>
                        <>
                            <p className = "h3">{winner.id === id ? "You win!" : `${winner.id} wins!`}</p>
                            <p className = "h6">Final hand value: {winner.total}</p>
                        </>
                    ) : <p className = "h3">Nobody wins!</p>}  
                    <div className = "row mt-4 mx-auto"> 
                        <Link to = "/games" className = "btn btn-primary mr-2">Main Menu</Link>
                        <Button disabled = {loading} onClick = {handlePlayAgain} className = "bml-2">Play Again {timer}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Winner;