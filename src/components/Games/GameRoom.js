import React, { useState, useEffect } from "react";
import Waiting from "./Waiting";
import InProgress from "./InProgress";
import NotFound from "./NotFound";
import useRoomListener from "../../hooks/useRoomListener";
import useSocketListener from "../../hooks/useSocketListener";
import { connectSocket } from "../Socket";
import Blackjack from "./Blackjack";
import War from "./War";
import { useAuth } from "../../contexts/AuthContext";
import useQueryDocs from "../../hooks/useQueryDocs";

/**
 * Listens for data from the database and server and routes it
 * to the appropriate game component.
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} match contains the match of this gameroom
 * @param {*} userData the user's information
 * @param {*} updateStorage for updating storing information
 */
const GameRoom = ({ match, userData, updateStorage }) => {
  const [connected, setConnected] = useState(false);
  const { currentUser } = useAuth();
  const { docs } = useQueryDocs("users", currentUser);
  const db = useRoomListener(match.params.roomId);
  const server = useSocketListener(connected);
  const id = userData && userData.username;
  const inProgress = db.status === "in-progress" && !connected;

  useEffect(() => {
    if (db.status === "waiting" && !connected) {
      let image = "/Images/blankProfile.png";
      if (docs && docs.picture) {
        image = docs.picture;
      }
      connectSocket(match.params.roomId, id, image);
      setConnected(true);
    }
  }, [db.status, connected, match.params.roomId, id, docs]);

  const renderGame = () => {
    switch (db.gameType) {
      case "Blackjack":
        return (
          <Blackjack
            server={server}
            updateStorage={updateStorage}
            userData={userData}
          />
        );
      case "War":
        return (
          <War
            server={server}
            updateStorage={updateStorage}
            userData={userData}
          />
        );
    }
  };

  return (
    <>
      {db.playersList ? (
        inProgress ? (
          <InProgress playersList={db.playersList} />
        ) : server.players.length ? (
          renderGame()
        ) : (
          <Waiting
            id={id}
            playersList={db.playersList}
            maxPlayers={db.maxPlayers}
          />
        )
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default GameRoom;
