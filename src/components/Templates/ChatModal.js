/**
 * Creates a Modal for creating a new gameroom.
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/2/2021
 */

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../assets/Chat.css";

/**
 * Creates a modal that allows a user to create a gameroom and connects that user to that gameroom
 * @param {any} closeModal if the user wants to close the modal
 * @param {any} id the identification of the user that opened or closed the modal
 * @returns The modal that will be displayed for the user
 */
const ChatModal = ({ closeModal, id, chatMsgs, addChatMsg }) => {
  const [currMsg, setCurrMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const MARGIN_OF_ERROR = 1;
  const EMPTY = 0;

  /**
   * Finds when the chatMsgs change and scrolls the chat to the newest msgs
   *  only if the user is at the bottom of the chat
   */
  useEffect(() => {
    if (scrolled === false) {
      updateScroll();
    }
  }, [chatMsgs]);

  /**
   * Updates the message to send to whatever the user enters into the input box
   * @param {*} event when the user changes a value in the input box
   */
  const handleChange = (event) => {
    // console.log("targte.value = "+event.target.value)
    setCurrMsg(event.target.value);
    // console.log("Changed current messag to "+currMsg)
  };

  /**
   * Sends the user's input as a message to the other players in the game and
   *  resets the input to be empty and jumps the scroll bar to the bottom.
   *  Only sends if the user has not entered an empty string
   */
  const sendMessage = async () => {
    if (currMsg) {
      await addChatMsg({ name: id, msg: currMsg });
      setCurrMsg("");
      updateScroll();
    }
  };

  /**
   * Jumps the Scroll bar of the chat directly to the bottom
   */
  const updateScroll = async () => {
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
    //Debug code
    // console.log("scrolled = "+scrolled)
    // console.log("scrollheight = "+event.target.scrollHeight)
    // console.log("scrollTop = "+event.target.scrollTop)
    // console.log("clientHeight = "+event.target.clientHeight)
    // console.log(event.target.scrollHeight - event.target.scrollTop ===
    //     event.target.clientHeight + MARGIN_OF_ERROR)
    // console.log(event.target.scrollHeight - event.target.scrollTop)

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
          {chatMsgs.length > EMPTY ? (
            <div
              className="chatbox col-xl-12"
              id="ChatBox"
              onScroll={handleScroll}
            >
              {chatMsgs.map((chat) => (
                <div className="message">
                  <div
                    className={`${chat.name === id ? "myname" : "othername"}`}
                  >
                    {chat.name === id ? "You:" : chat.name + ":"}
                  </div>

                  <div
                    className={`${
                      chat.name === id ? "mymsg" : "othermsg"
                    } row p-3 m-1`}
                  >
                    {chat.msg}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          <div class="form-container">
            {scrolled ? (
              <button type="button" class="btn jump" onClick={updateScroll}>
                Jump to Most Recent
              </button>
            ) : (
              <></>
            )}

            <input
              type="text"
              placeholder="Enter a Message..."
              value={currMsg}
              onChange={handleChange}
              id="sendBox"
            ></input>

            <Button class="btn" onClick={sendMessage}>
              Send
            </Button>
            <button type="button" class="btn cancel" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ChatModal;
