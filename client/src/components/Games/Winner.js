import styles from '../../assets/Transitions.module.css'
import { Link } from 'react-router-dom';
import { updateWins, getWins, getUID } from '../Socket';
import { increment, db } from '../../firebase';


const Waiting = ({ id, winners }) => {
    


const updateStats = async (userID) => {
    updateWins(userID);
}

const callWins = async (uID) => {
    return getWins(uID);
}

const getUserID = async () => {
    return getUID();
}


    //Works, gets the specific player's wins
    async function funct1(name) {

        const ID = await funct2(name)

        alert(ID)

        db.collection("users").doc(ID).update({
            "stats.wins": increment()
        });   
    }

    //Works, gets the specific player's wins
    async function funct2(name) {

        const refID = await db.collection("usernames").doc(name);  
        
        return refID.get().then((snap1) => {
            if(snap1.exists) {
                return snap1.get("uid")
            }
            else {
                alert("not found")
            }
        });
    }

    return (
        <div className = {styles.bgWinner}>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center" >
                <div className="text-center text-light">
                    { winners.length ? winners.map(winner =>
                        <>
                            <p className = "h3">{winner.id === id ? "You win!" : `${winner.id} wins!`}</p>
                            <p className = "h6">Final hand value: {winner.total}</p>

                            {/*Update the user's total games won*/}
                            {/*updateWins(getUID())*/}

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