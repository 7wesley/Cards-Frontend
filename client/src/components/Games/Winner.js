import styles from '../../assets/Transitions.module.css'
import { Link } from 'react-router-dom';
const Waiting = ({ id, winners }) => {
    
    return (
        <div className = {styles.bgWinner}>
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
                        <Link to = '/' className = "btn btn-primary ml-2">Play Again</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Waiting;