/**
 * Creates a Modal for creating a new gameroom.
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../assets/Chat.css";

/**
 * Creates a modal that allows a user to create a gameroom and connects that user to that gameroom
 * @param {any} closeModal if the user wants to close the modal
 * @param {any} id the identification of the user that opened or closed the modal
 * @returns The modal that will be displayed for the user
 */
const HostModal = ({ closeModal, id, chatMsgs, addChatMsg }) => {
  const [currMsg, setCurrMsg] = useState("");

  /**
   * Handles what happens when the user clicks the submit button of this modal
   * @param {any} e the game that this is for
   */
  const handleChat = async (field) => {
    closeModal();
  };

  /**
   * Updates the message to send to whatever the user enters into the input box
   * @param {*} event when the user changes a value in the input box
   */
  const handleChange = async (event) => {
    // console.log("targte.value = "+event.target.value)
    await setCurrMsg(event.target.value);
    // console.log("Changed current messag to "+currMsg)
  };

  /**
   * Sends the user's input as a message to the other players in the game and
   *  resets the input to be empty
   */
  const sendMessage = async () => {
    await addChatMsg({ name: id, msg: currMsg });
    setCurrMsg("");
  };

  return (
    <>
      <Modal.Header closeButton={closeModal}>
        <h1>Chat</h1>
      </Modal.Header>
      <Modal.Body>
        <div class="chat-popup" id="myForm">
          {/* <textarea> */}
          <div className="MessageList">
            {chatMsgs.length > 0 ? (
              chatMsgs.map((message, i) => (
                <div>
                  {message.name && (
                    <span className="author">{message.name}:</span>
                  )}
                  {message.msg}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          {/* </textarea> */}

          {chatMsgs.map((data) => {
            <div>
              {data.name}
              <div>{data.msg}</div>
            </div>;
          })}

          <form class="form-container">
            {/* <label for="msg"><b>Message</b></label> */}
            <input type="text" value={currMsg} onChange={handleChange}></input>

            <Button class="btn" onClick={sendMessage}>
              Send
            </Button>
            <button type="button" class="btn cancel" onClick={closeModal}>
              Close
            </button>
          </form>
        </div>
      </Modal.Body>
    </>
  );
};

export default HostModal;
