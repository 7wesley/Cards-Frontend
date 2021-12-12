/**
 * Creates a Modal for creating a new gameroom.
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/2/2021
 */

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../assets/Chat.css";
import { getSocket } from "../Socket";

/**
 * Creates a modal that allows a user to create a gameroom and connects that user to that gameroom
 * @param {any} closeModal if the user wants to close the modal
 * @param {any} id the identification of the user that opened or closed the modal
 * @returns The modal that will be displayed for the user
 */
const ChatModal = ({ closeModal, messages, setMessages, id }) => {
  const [currMsg, setCurrMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const MARGIN_OF_ERROR = 1;

  /**
   * Finds when the chatMsgs change and scrolls the chat to the newest msgs
   *  only if the user is at the bottom of the chat
   */
  useEffect(() => {
    if (scrolled === false) {
      updateScroll();
    }
  }, [messages]);

  /**
   * Updates the message to send to whatever the user enters into the input box
   * @param {*} event when the user changes a value in the input box
   */
  const handleChange = (event) => {
    setCurrMsg(event.target.value);
  };

  /**
   * Sends the user's input as a message to the other players in the game and
   *  resets the input to be empty and jumps the scroll bar to the bottom.
   *  Only sends if the user has not entered an empty string
   */
  const sendMessage = () => {
    if (currMsg) {
      const formattedMsg = { sender: id, text: currMsg };
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.push(formattedMsg);
        return newMessages;
      });
      getSocket().emit("send-message", formattedMsg);
      setCurrMsg("");
      updateScroll();
    }
  };

  /**
   * Jumps the Scroll bar of the chat directly to the bottom
   */
  const updateScroll = () => {
    var element = document.getElementById("ChatBox");
    if (element != null) {
      element.scrollTop = element.scrollHeight;
    }
    setScrolled(false);
  };

  /**
   * Sets the value of if the user has scrolled to true if the current position of the
   *  scroller is not at the bottom
   * @param {*} event when the chatbox is scrolled
   */
  const handleScroll = (event) => {
    //If the scroll is already at the bottom, set the scrolled value to false
    if (
      event.target.scrollHeight - event.target.scrollTop <=
      event.target.clientHeight + MARGIN_OF_ERROR
    ) {
      setScrolled(false);
    } else {
      setScrolled(true);
    }
  };

  return (
    <>
      <Modal.Header closeButton={closeModal}>
        <h1>Chat</h1>
      </Modal.Header>
      <Modal.Body>
        <div class="chat-popup" id="myForm">
          <div
            className="chatbox col-xl-12"
            id="ChatBox"
            onScroll={handleScroll}
          >
            {messages.map((message) => (
              <div className="message">
                <div
                  className={`${
                    message.sender === id ? "myname" : "othername"
                  }`}
                >
                  {message.sender === id ? "You:" : message.sender + ":"}
                </div>

                <div
                  className={`${
                    message.sender === id ? "mymsg" : "othermsg"
                  } row p-3 m-1`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div class="form-container text-center mt-2">
            {scrolled && (
              <button class="btn jump mb-2" onClick={updateScroll}>
                Jump to Most Recent
              </button>
            )}
            <div class="row justify-content-center">
              <input
                type="text"
                class="w-75"
                placeholder="Enter a Message..."
                value={currMsg}
                onChange={handleChange}
                id="sendBox"
                autocomplete="off"
              ></input>
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ChatModal;
