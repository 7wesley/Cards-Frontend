/**
 * Creates a Modal for creating a new gameroom.
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState } from "react";
import { db, timestamp } from "../../firebase";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/**
 * Creates a modal that allows a user to create a gameroom and connects that user to that gameroom
 * @param {any} closeModal if the user wants to close the modal
 * @param {any} id the identification of the user that opened or closed the modal
 * @returns The modal that will be displayed for the user
 */
const HostModal = ({ closeModal, id }) => {
    const [game, setGame] = useState("");
    const history = useHistory();

    /**
     * Handles what happens when the user clicks the submit button of this modal
     * @param {any} e the game that this is for
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        let roomRef = db.collection("rooms").doc();
        await roomRef.set({
            game,
            players: {},
            maxPlayers: e.target[3].value,
            gameId: roomRef.id,
            host: id,
            status: "waiting",
            createdAt: timestamp(),
        });
        closeModal();
        history.push(`/games/${roomRef.id}`);
    };

    /**
     * What to do when something changes in the modal
     */
    const handleChange = () => {};

    return (
        <>
            <Modal.Header closeButton={closeModal}>Host game</Modal.Header>
            <Form onChange={handleChange} onSubmit={handleSubmit}>
                <Modal.Body>
                    <h2>Customizations</h2>

                    {/*The radio button for selecting which game the user wants to play*/}
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
                            <label
                                className="custom-control-label"
                                htmlFor="customRadio1"
                            >
                                Blackjack
                            </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="customRadio2"
                                name="customRadio"
                                className="custom-control-input"
                                value="Poker"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="customRadio2"
                            >
                                Poker
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
                            <label
                                className="custom-control-label"
                                htmlFor="customRadio3"
                            >
                                War
                            </label>
                        </div>
                    </div>

                    {/*A textbox for selecting the number of players they want in a game*/}
                    <div className="form-group mt-3">
                        <label className="mr-3" htmlFor="quantity">
                            Number of Players (2 to 8)
                        </label>

                        {/*the min and max fields hold the range of numbers that the user can input for this choice.
                        We will need to code this to a field or variable in the future so that we do not have
                        to go through every line of code and find where we specify a max of 8 plauers can play a game*/}
                        <input
                            data-cy="playersInput"
                            placeholder="2"
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="2"
                            max="8"
                            required
                        />
                    </div>

                    {/*A checkbox for selecting if the user wants to have computers*/}
                    <div className="custom-control custom-checkbox my-1 mr-sm-2">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customControlInline"
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="customControlInline"
                        >
                            Computer players?
                        </label>
                    </div>
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
