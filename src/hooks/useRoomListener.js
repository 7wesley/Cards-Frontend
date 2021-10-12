/**
 * Finds if a room exists and how many players are in the gameroom
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import { useState, useEffect } from "react";
import { db } from "../firebase";

/**
 * Finds a gameroom given the room as a parameter and returns the room's
 *  information if it exists
 * @param {any} room the room to check for
 * @returns the players in the room, the max players that the room can hold and
 *  the status of the room if it is found, otherwise returns the snapshot
 *  of the room that could not be found
 */
const useRoomListener = (room) => {
  const [playersList, setPlayersList] = useState({});
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [status, setStatus] = useState();

  useEffect(() => {
    const listener = async () => {
      let doc = await db.collection("rooms").doc(room).get();
      if (doc.exists) {
        const unsubscribe = db
          .collection("rooms")
          .doc(room)
          .onSnapshot((snap) => {
            if (snap.data()) {
              setPlayersList(snap.data().players);
              setMaxPlayers(snap.data().maxPlayers);
              setStatus(snap.data().status);
            } else setPlayersList(null);
          });
        return () => unsubscribe();
      }
      setPlayersList(null);
    };
    listener();
  }, [room]);

  return { playersList, maxPlayers, status };
};

export default useRoomListener;
