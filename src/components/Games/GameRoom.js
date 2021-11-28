/**
 * Manages and creates the card match that players interact with
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState, useEffect } from "react";
import { Prompt } from "react-router";
import Waiting from "./Waiting";
import InProgress from "./InProgress";
import NotFound from "./NotFound";
import useRoomListener from "../../hooks/useRoomListener";
import useSocketListener from "../../hooks/useSocketListener";
import { getSocket, connectSocket } from "../Socket";
import Blackjack from "./Blackjack";
import War from "./War";

/**
 * The page that users play games
 * @param {any} match contains the match of this gameroom
 * @param {any} userData the user's information
 * @param {any} updateStorage for updating storing information
 * @returns The webpage this class creates
 */
const GameRoom = ({ match, userData, updateStorage }) => {
  const [connected, setConnected] = useState(false);
  const { playersList, maxPlayers, status, gameType } = useRoomListener(
    match.params.roomId
  );
  const { players, countdown, turn, timer, results } =
    useSocketListener(connected);
  const id = userData && userData.username;
  const inProgress = status === "in-progress" && !connected;
  const renderGame = () => {
    switch (gameType) {
      case "Blackjack":
        return (
          <Blackjack
            userData={userData}
            players={players}
            turn={turn}
            timer={timer}
            results={results}
            updateStorage={updateStorage}
            userData={userData}
          />
        );
      case "War":
        return (
          <War
            userData={userData}
            players={players}
            turn={turn}
            timer={timer}
            results={results}
            updateStorage={updateStorage}
            userData={userData}
          />
        );
    }
  };
  useEffect(() => {
    if (status === "waiting" && !connected) {
      connectSocket(match.params.roomId, id);
      setConnected(true);
    }
  }, [status, connected, match.params.roomId, id]);

  return (
    <>
      {playersList ? (
        inProgress ? (
          <InProgress playersList={playersList} />
        ) : players.length ? (
          renderGame()
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
