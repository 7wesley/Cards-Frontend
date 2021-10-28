/**
 * Creates a Waiting page that users are redirected to when they join or create
 *  a game that does not have enough players to start a game.
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import styles from "../../assets/Transitions.module.css";
import React, { useState, useRef } from "react";
import { InputGroup, FormControl, Overlay, Tooltip } from "react-bootstrap";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

/**
 * The page that is displayed if the user is waiting for other players to join their game.
 * @param {any} id the identification of the player
 * @param {any} playersList the list of players currently in this room
 * @param {any} maxPlayers the max amount of players this player can hold
 * @param {any} countdown the number that is displayed and is count down to 0 when enough players
 *      join the gameroom.
 * @returns this webpage
 */
const Waiting = ({ id, playersList, maxPlayers, countdown }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  /**
   * Copies the current game room information to the user's clipboard
   */
  const handleCopy = async () => {
    var copyText = document.querySelector("#copyText");
    copyText.select();
    document.execCommand("copy");
    setShow(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShow(false);
  };

  return (
    <div className={styles.bgWaiting}>
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="text-center text-light">
          {/*The countdown that will display when enough users join*/}
          {countdown ? (
            <>
              <p className="h6"> Game starting in </p>
              <motion.p
                animate={{
                  rotate: 360,
                }}
                className="h6"
              >
                {" "}
                {countdown}
              </motion.p>
            </>
          ) : (
            <>
              <p className="h3">Waiting for players... </p>
              <p className="h3 mb-4" data-cy="playerCount">
                ({Object.keys(playersList).length} out of {maxPlayers})
              </p>

              <p className="h4">Players in room:</p>
              <motion.div layout data-cy="playersList">
                {Object.keys(playersList).map((player, index) => (
                  <p key={index} className="mb-0">
                    {" "}
                    {player} {id === player && "(You)"}
                  </p>
                ))}
              </motion.div>

              <InputGroup className="mb-2 mt-4" id="copyIcon">
                <InputGroup.Prepend>
                  <InputGroup.Text ref={target} onClick={handleCopy}>
                    <FontAwesomeIcon size="lg" icon={faCopy} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="copyText"
                  defaultValue={window.location.href}
                />
              </InputGroup>

              <Overlay target={target.current} show={show} placement="top">
                {(props) => (
                  <Tooltip id="overlay" {...props}>
                    Copied!
                  </Tooltip>
                )}
              </Overlay>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Waiting;
