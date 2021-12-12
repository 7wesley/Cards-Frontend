import React, { useState, useRef } from "react";
import { InputGroup, FormControl, Overlay, Tooltip } from "react-bootstrap";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

/**
 * Waiting screen before a game's player quota is met
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} id the identification of the player
 * @param {*} playersList the list of players currently in this room
 * @param {*} maxPlayers the max amount of players this player can hold
 */
const Waiting = ({ id, playersList, maxPlayers }) => {
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
    <div className="bg-waiting">
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="text-center text-light">
          <p className="h3">Waiting for players... </p>
          <p className="h3 mb-4" data-cy="playerCount">
            ({Object.keys(playersList).length} out of {maxPlayers})
          </p>
          <p className="h4">Players in room:</p>
          <motion.div layout data-cy="playersList">
            {Object.values(playersList).map((player, index) => (
              <p key={index} className="mb-0">
                {player.username} {id === player.username && "(You)"}
              </p>
            ))}
          </motion.div>
          <InputGroup className="mb-2 mt-4" id="copyIcon">
            <InputGroup.Prepend>
              <InputGroup.Text ref={target} onClick={handleCopy}>
                <FontAwesomeIcon size="lg" icon={faCopy} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="copyText" defaultValue={window.location.href} />
          </InputGroup>
          <Overlay target={target.current} show={show} placement="top">
            {(props) => (
              <Tooltip id="overlay" {...props}>
                Copied!
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
    </div>
  );
};

export default Waiting;
