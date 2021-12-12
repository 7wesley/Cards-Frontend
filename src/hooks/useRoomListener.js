import { useState, useEffect } from "react";
import { db } from "../firebase";

/**
 * Listens for any changes to the room the player is a part of
 * in the database and returns it
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} room - The room to query
 * @returns the playerList, maxPlayers, status, and gameType of the
 * current room
 */
const useRoomListener = (room) => {
  const [playersList, setPlayersList] = useState({});
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [status, setStatus] = useState("");
  const [gameType, setGameType] = useState("");

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
              setGameType(snap.data().game);
            } else setPlayersList(null);
          });
        return () => unsubscribe();
      }
      setPlayersList(null);
    };
    listener();
  }, [room]);

  return { playersList, maxPlayers, status, gameType };
};

export default useRoomListener;
