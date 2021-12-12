import React, { useState } from "react";
import { db, timestamp } from "../../firebase";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/**
 * Modal that allows a user to host a room and connects that user to that room
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} closeModal - Function that closes this modal
 * @param {*} id - The id of the current user
 */
const HostModal = ({ closeModal, id }) => {
  const [game, setGame] = useState("");
  const history = useHistory();

  /**
   * Handles what happens when the user clicks the submit button of this modal
   * @param {*} e the game that this is for
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let roomRef = db.collection("rooms").doc();
    await roomRef.set({
      game,
      players: {},
      maxPlayers: Number(e.target[2].value),
      bank: Number(e.target[3].value),
      gameId: roomRef.id,
      host: id,
      status: "waiting",
      createdAt: timestamp(),
    });
    closeModal();
    history.push(`/games/${roomRef.id}`);
  };

  return (
    <>
      <Modal.Header closeButton={closeModal}>Host game</Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <h2>Customizations</h2>
          <div onChange={(e) => setGame(e.target.value)}>
            <div
              className="custom-control custom-radio custom-control-inline"
              data-cy="blackjackRadio"
            >
              <input
                type="radio"
                id="customRadio1"
                name="customRadio"
                className="custom-control-input"
                value="Blackjack"
                required
              />
              <label className="custom-control-label" htmlFor="customRadio1">
                Blackjack
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadio3"
                name="customRadio"
                className="custom-control-input"
                value="War"
              />
              <label className="custom-control-label" htmlFor="customRadio3">
                War
              </label>
            </div>
          </div>
          <div className="form-group mt-3">
            <label className="mr-3" htmlFor="quantity">
              Number of Players (2 to 9)
            </label>

            <input
              data-cy="playersInput"
              placeholder="2"
              type="number"
              id="quantity"
              name="quantity"
              min="2"
              max="9"
              required
            />
          </div>
          <label className="mr-3" htmlFor="bank">
            Player bank
          </label>
          $
          <input
            className="w-25"
            data-cy="bankInput"
            placeholder="500"
            id="bank"
            name="bank"
            pattern="[0-9]+"
            title="Please enter numbers only"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
          <Button type="submit" data-cy="submitButton">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default HostModal;
