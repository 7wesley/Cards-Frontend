import styles from '../../assets/Information.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import React, { useState } from "react";

const Stats = ({ id, stats }) => {

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

    const blank = {'Wins' : 0, 'Losses' : 0, 'Played' : 0}
    stats = blank;
    const { currentUser } = useAuth();

    const barChart = (
        <div className = "barChart">
            {stats 
                ? (
                    <Bar 
                        data = {{
                            labels: ['Wins', 'Losses', 'Played'],
                            datasets: [{
                                label: 'Total',
                                backgroundColor: [
                                    'rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'
                                ],
                                data: [stats.Wins, stats.Losses, stats.Played]
                            }]
                        }}
                    
                        options = {{
                            responsive: true,
                            legend: { display: false },
                            title: { display: true, text:`Stats`},
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        precision: 0,
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
                    />
                ) : null }
        </div>
    );

    return (
        <>
            <div className = {styles.darkBlock}>  
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <h5 className="text-light">
                            <FontAwesomeIcon icon = {faTrophy} size = '3x' />
                        </h5>
                    </div>
                </div>
            </div>
            <div className = "container mt-5">
                <div className = "mx-auto col-lg-8 col-md-10 col-xs-12">
                    <p className="h3 text-center">{id}'s stats:</p>            
                    
                    <div>Wins: {wins}</div>
                    <div>Losses: {losses}</div>
                    <div>Played: {played}</div>
                    
                    {/*}
                    {stats && Object.keys(stats).map(key => 
                        <div>
                            {key + ": " + stats[key]}
                        </div>
                    )}  
                    */}

                    { stats && barChart}  
                    {!currentUser && <p className = "h5 mt-2 text-center">Want permanent stats? <Link to = "/login">Create an account</Link></p>}                      
                </div>
            </div>
        </>
            
    )
}

export default Stats;