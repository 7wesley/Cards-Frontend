/**
 * Creates a Winner page that is displayed at the end of a match. It shows the
 *  winners of the match and the user's updated stats
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import styles from "../../assets/Transitions.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getSocket } from "../Socket";
import { connect } from "react-redux";
import { store } from "../../store.js";
import { useDispatch } from "react-redux";
import { incrementWins, incrementLosses } from "../../actions";

/**
 * The page that is displayed when a gameroom has finished
 * @param {any} userData the user's information
 * @param {any} winners a list of the winners of the match
 * @param {any} timer the timer that is countdown that kicks out players if it gets to 0
 * @param {any} updateStorage a reference for updating this user's storage
 * @returns this webpage
 */
const Winner = ({ /**userData,**/ winners, timer, updateStorage }) => {
  const socket = getSocket();
  const [loading, setLoading] = useState(false);

  const userData = store.getState().user;
  const id = store.getState().user.username;

  const dispatch = useDispatch();

  //Updates the user's stats on a win
  const handleIncreaseWins = () => {
    dispatch(incrementWins("Incremented the user's wins"));
  };

  //Updates the user's stats on a loss
  const handleIncreaseLosses = () => {
    dispatch(incrementLosses("Incremented the user's losses"));
  };

  /**
   * initializes the timer
   */
  useEffect(() => {
    timer === 0 && setLoading(true);
  }, [timer]);

  /**
   * Shows the winners and updates the user's stats
   */
  useEffect(() => {
    //Updates the stats of the winner or loser
    const updateStats = async () => {
      if (id) {
        //If the user wins
        if (winners.some((winner) => winner.id === id)) {
          userData.stats.Wins++;
          handleIncreaseWins();
        }
        //If the user losses
        else {
          userData.stats.Losses++;
          userData.stats.Played++;
          handleIncreaseLosses();
        }
        await updateStorage({ stats: userData.stats });
      }
    };
    updateStats();
  }, [id]);

  /**
   * Handles if the user wants to play again
   */
  const handlePlayAgain = () => {
    socket.emit("play-again");
  };

  return (
    <div className={styles.bgInProgress}>
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="text-center text-light">
          {winners.length ? (
            winners.map((winner, index) => (
              <div key={index}>
                <p className="h3">
                  {winner.id === id ? "You win!" : `${winner.id} wins!`}
                </p>
                <p className="h6">Final hand value: {winner.total}</p>
                <p className="h4 mt-4">---Stats---</p>
                <p className="h6">
                  {userData &&
                    Object.keys(userData.stats).map(
                      (stat) => `  ${stat}: ` + userData.stats[stat]
                    )}
                </p>
                {/*Update the user's total games won*/}
                {/*updateWins(getUID())*/}
                {/*funct4(id)*/}
              </div>
            ))
          ) : (
            <p className="h3">Nobody wins!</p>
          )}
          <div className="row mt-4 mx-auto">
            <Link to="/games" className="btn btn-primary mr-2">
              Main Menu
            </Link>
            <Button
              disabled={loading}
              onClick={handlePlayAgain}
              className="bml-2"
            >
              Play Again {timer}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

//Any time the store is updated, this function is called for this component
const mapStateToProps = (state) => {
  return {
    ...state,
    user: {
      username: "new name",
    },
  };
};

//Makes a call to the reducer so that it can tell the store to update state
//This function is called whenever this component receives new props
const mapDispatchToProps = (dispatch) => {
  return {
    modifyState: () =>
      dispatch(incrementWins("Clicked something on Routing page")),
  };
};

//Connects this component component with the Redux store.
//exports the component object with the values from the store
export default connect(mapStateToProps, mapDispatchToProps)(Winner);
