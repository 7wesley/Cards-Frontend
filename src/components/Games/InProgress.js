import { motion } from "framer-motion";

/**
 * Where a user will be routed if they join a game that's in progress
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} playerList the list of players that will join the game
 */
const InProgress = ({ playersList }) => {
  return (
    <div className="bg-in-progress">
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="text-center text-light">
          <p className="h3">This game is in progress...</p>
          <p className="h6">
            If a player leaves, you will be able to join when the game ends
          </p>
          <p className="h4 mt-4">Players currently in room:</p>
          <motion.div layout>
            {Object.values(playersList).map((player) => (
              <p className="mb-0"> {player.username} </p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InProgress;
