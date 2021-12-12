/**
 * Creates a Stats page that allows users to view their current game stats
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React from "react";

/**
 * The page that shows the user's stats
 * @param {any} userData the user's information
 * @returns The stats webpage
 */
const Stats = ({ userData }) => {
  const { currentUser } = useAuth();

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
      <div className="dark-block">
        <div className="d-flex justify-content-center align-items-center h-100">
          <h5 className="text-light">
            <FontAwesomeIcon icon={faTrophy} size="3x" />
          </h5>
        </div>
      </div>
      <div className="container mt-5">
        <div className="mx-auto col-lg-8 col-md-10 col-xs-12">
          <p className="h3 text-center" data-cy="usernameText">
            {userData && userData.username}'s stats:
          </p>

          {userData &&
            Object.keys(userData.stats).map((key) => (
              <div key={key}>{key + ": " + userData.stats[key]}</div>
            ))}

          {userData && barChart}
          {!currentUser && (
            <p className="h5 mt-2 text-center" data-cy="createAccountText">
              Want permanent stats? <Link to="/login">Create an account</Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Stats;
