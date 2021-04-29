import styles from '../../assets/Transitions.module.css'
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getSocket } from '../Socket';
import { db, increment } from '../../firebase';

const Winner = ({ id, winners, timer }) => {
    
    const socket = getSocket();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        timer == 0 && setLoading(true);
    }, [timer]);

    const handlePlayAgain = () => {
        socket.emit('play-again');
    }

const updateStats = async (userID) => {
    updateWins(userID);
}

const callWins = async (uID) => {
    return getWins(uID);
}


    //updates the player's wins
    async function funct1(name) {

        const ID = await funct2(name)

        alert(ID)

        db.collection("users").doc(ID).update({
            "stats.wins": increment()
        });   
    }

    //try another way
    async function funct2(name) {

        const refID = db.collection("usernames").doc(name);  
        
        return refID.get().then((snap1) => {
            if(snap1.exists) {
                return snap1.get("uid")
            }
            else {
                alert("not found")
            }
        });
    }

    //Gets the specific user's id
    async function getUserID(name) {

        //Gets a snapshot of this user's id
        const refID = db.collection("usernames").doc(name);  
        
        //Returns the user's id
        const snap1 = await refID.get();
        if (snap1.exists) {

            //alert(snap1.get("uid"))
            return snap1.get("uid");
        }
    }

    //try this way
    async function funct3(name) {
        
        const userID = await getUserID(name);
        alert(userID)

        db.collection("users").doc(userID).update({
            "stats.wins": increment
        }); 

    }

        //try this way
    function funct4(name) {

        const ref = db.collection("users").doc("sxfCyow1vQclhv1lOkOBoISRS432");
        //const increaseBy = firebase.firestore.FieldValue.increment(1);

        // ref.update({
        //     "stats.wins": increaseBy
        // }); 

        // ref.update({
        //     stats: {
        //       [wins]: FieldValue.increment(1)
        //     }
        // }, { merge: true });

        // ref.set({
        //     stats: {
        //       [wins]: FieldValue.increment(1)
        //     }
        // }, { merge: true });

        ref.update({
            'stats.wins': increment(1)
        });

    }

    return (
        <div className = {styles.bgInProgress}>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center" >
                <div className="text-center text-light">
                    { winners.length ? winners.map(winner =>
                        <>
                            <p className = "h3">{winner.id === id ? "You win!" : `${winner.id} wins!`}</p>
                            <p className = "h6">Final hand value: {winner.total}</p>

                            {/*Update the user's total games won*/}
                            {/*updateWins(getUID())*/}
                            {/*funct4(id)*/}

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