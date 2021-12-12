import React, { useState, useCallback } from "react";
import HostModal from "../Templates/HostModal.js";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGames from "../../hooks/useGamesListener";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Displays joinable rooms to the user and allows a user to
 * host a room
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} id the id of the player that accesses this page
 */
const Games = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const { games } = useGames(filter);
  const { currentUser } = useAuth();

  /**
   * Closes the HostModal if the user backs out
   */
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return (
    <div className="container position-relative mt-5">
      <div>
        <Form
          onChange={(e) => setFilter(e.target.value)}
          className="position-absolute d-none d-lg-block"
          style={{ right: 0 }}
        >
          <Form.Control
            className="mt-2"
            type="text"
            placeholder="Find room or user ID 🔍"
          />
        </Form>
      </div>
      <div className="text-center d-flex">
        <div className="mx-auto">
          <p className="h5" data-cy="usernameText">
            Welcome, {id}
          </p>
          {!currentUser && (
            <p className="h5" data-cy="createAccountText">
              Want more features? <Link to="/login">Create an account</Link>
            </p>
          )}

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary mt-2"
            data-toggle="modal"
            data-cy="hostButton"
          >
            Host
          </button>
        </div>
      </div>
      <div className="row mt-4">
        {games.length ? (
          games.map(
            (game) =>
              game.status === "waiting" && (
                <div className="game-container col-6" key={game.gameId}>
                  <motion.div
                    className="card border-dark mb-3"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    data-cy="gameCard"
                  >
                    <div className="card-header">
                      <p className="text-dark h6">{game.gameId}</p>
                    </div>

                    <div className="card-body">
                      <p className="h4">Game: {game.game}</p>
                      <p className="h4">Host: {game.host}</p>
                      <p className="h4">
                        Players: {Object.keys(game.players).length}/
                        {game.maxPlayers}
                      </p>
                      <div className="text-center">
                        <Link
                          to={"/games/" + game.gameId}
                          className="btn btn-primary"
                        >
                          Join
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                  <br></br>
                </div>
              )
          )
        ) : (
          <p className="mx-auto h5 mt-5">No games found</p>
        )}
      </div>

      <Modal data-cy="hostModal" show={modalOpen} onHide={closeModal}>
        <HostModal closeModal={closeModal} id={id} />
      </Modal>
    </div>
  );
};

export default Games;
