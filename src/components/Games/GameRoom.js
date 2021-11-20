/**
 * Manages and creates the card match that players interact with
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState, useEffect } from "react";
import { Prompt } from "react-router";
import Waiting from "./Waiting";
import Winner from "./Winner";
import InProgress from "./InProgress";
import NotFound from "./NotFound";
import useRoomListener from "../../hooks/useRoomListener";
import useSocketListener from "../../hooks/useSocketListener";
import { getSocket, connectSocket } from "../Socket";
import Blackjack from "./Blackjack";

/**
 * The page that users play games
 * @param {any} match contains the match of this gameroom
 * @param {any} userData the user's information
 * @param {any} updateStorage for updating storing information
 * @returns The webpage this class creates
 */
const GameRoom = ({ match, userData, updateStorage }) => {
  const [connected, setConnected] = useState(false);
  const { playersList, maxPlayers, status } = useRoomListener(
    match.params.roomId
  );
  const { players, countdown, prompt, turn, timer, message, winners } =
    useSocketListener(connected);
  const id = userData && userData.username;

  useEffect(() => {
    //if the room is open and they aren't already connected:
    if (status === "waiting" && !connected) {
      connectSocket(match.params.roomId, id);
      setConnected(true);
    }
  }, [status, connected, match.params.roomId, id]);

  /**
   * Takes care of the decision made by the player
   * @param {*} choice the decision of the player for their turn
   */
  const handlePlay = (choice) => {
    getSocket().emit("player-move", choice);
  };

  return (
    <>
      <Prompt
        when={connected && !winners}
        message="This will exit you from the game. Are you sure?"
      />

      {playersList ? (
        status === "in-progress" && !connected ? (
          <InProgress playersList={playersList} />
        ) : !winners && players.length ? (
          <Blackjack
            id = {id}
            players={players}
            prompt={prompt}
            turn={turn}
            timer={timer}
            message={message}
          />
        ) : winners ? (
          <Winner
            userData={userData}
            winners={winners}
            timer={timer}
            updateStorage={updateStorage}
          />
        ) : (
          <Waiting
            id={id}
            playersList={playersList}
            maxPlayers={maxPlayers}
            countdown={countdown}
          />
        )
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default GameRoom;
