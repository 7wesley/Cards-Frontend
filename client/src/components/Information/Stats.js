import React from 'react';
import styles from '../../assets/Information.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Stats = ({ id, stats }) => {

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
                    {stats && Object.keys(stats).map(key => 
                        <div>
                            {key + ": " + stats[key]}
                        </div>
                    )}  
                    { stats && barChart}  
                    {!currentUser && <p className = "h5 mt-2 text-center">Want permanent stats? <Link to = "/login">Create an account</Link></p>}                      
                </div>
            </div>
        </>
            
    )
}

export default Stats;