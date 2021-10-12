/**
 * Creates a Stats page that allows users to view their current game stats
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import styles from "../../assets/Information.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React from "react";
import { connect } from "react-redux";
import { store } from "../../store.js";

/**
 * The page that shows the user's stats
 * @param {any} userData the user's information
 * @returns The stats webpage
 */
const Stats = () => {
    const { currentUser } = useAuth();

    console.log("yes");

    const userData = store.getState().user;

    //The chart that will be shown with the user's stats
    const barChart = (
        <div className="barChart">
            {userData ? (
                <Bar
                    data={{
                        labels: ["Wins", "Losses", "Played"],
                        datasets: [
                            {
                                label: "Total",
                                backgroundColor: [
                                    "rgba(0, 0, 255, 0.5)",
                                    "rgba(0, 255, 0, 0.5)",
                                    "rgba(255, 0, 0, 0.5)",
                                ],
                                data: [
                                    userData.stats.Wins,
                                    userData.stats.Losses,
                                    userData.stats.Played,
                                ],
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        legend: { display: false },
                        title: { display: true, text: `Stats` },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        precision: 0,
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    }}
                />
            ) : null}
        </div>
    );

    return (
        <>
            {/* <button onClick={props.modifyState}>Add Something... </button>
            <h4>
                props.stateValue = {props.stateValue}
            </h4> */}

            <div className={styles.darkBlock}>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <h5 className="text-light">
                            <FontAwesomeIcon icon={faTrophy} size="3x" />
                        </h5>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="mx-auto col-lg-8 col-md-10 col-xs-12">
                    <p className="h3 text-center" data-cy="usernameText">
                        {userData && userData.username}'s stats:
                    </p>

                    {userData &&
                        Object.keys(userData.stats).map((key) => (
                            <div key={key}>
                                {key + ": " + userData.stats[key]}
                            </div>
                        ))}

                    {userData && barChart}
                    {!currentUser && (
                        <p
                            className="h5 mt-2 text-center"
                            data-cy="createAccountText"
                        >
                            Want permanent stats?{" "}
                            <Link to="/login">Create an account</Link>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

//Any time the store is updated, this function is called for this component
const mapStateToProps = (state) => {
    return {
        stateValue: state,
    };
};

//Makes a call to the reducer so that it can tell the store to update state
//This function is called whenever this component receives new props
const mapDispatchToProps = (dispatch) => {
    return {
        //Returns a call to the reducer with this type of action
        modifyState: () => dispatch({ type: "Obj_1_State" }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

/*
    //Updates the user's stats to match what is on Firebase
    async function updateStats(name) {

        //Gets the ID of the user
        const ID = await getUserID(name)

        //Gets a snapshot of the this user's stats
        const ref1 = db.collection("users").doc(ID);   
        
        ref1.get().then((snap2) => {

            //If the user exists, update the stats
            if(snap2.exists) {
                setWins(snap2.get("stats.wins"))
                setLosses(snap2.get("stats.losses"))
                setPlayed(snap2.get("stats.played"))
            }
            
            //There was a problem getting the user's data
            else {
                alert("User ", id, " does not exist")
            }
        })
    }

    //Gets the specific user's id
    async function getUserID(name) {

        //Gets a snapshot of this user's id
        const refID = await db.collection("usernames").doc(name);  
        
        //Returns the user's id
        return refID.get().then((snap1) => {
            if(snap1.exists) {

                //alert(snap1.get("uid"))

                return snap1.get("uid")
            }
        });
    }
    
    //Initialize the fields to use
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [played, setPlayed] = useState(0)

    //Update the user's stats
    updateStats(id)

    const blank = {'Wins' : wins, 'Losses' : losses, 'Played' : played}
    stats = blank;
    */
