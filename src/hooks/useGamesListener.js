import { useState, useEffect } from "react";
import { db } from "../firebase";

/**
 * Gets the available games from the database and filters it
 * if necessary
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} filter - The filter to find a game by
 * @returns the filtered games
 */
const useGames = (filter) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let data = snap.docs.map((doc) => doc.data());
        data = data.filter((doc) => {
          if (doc.status === "in-progress") {
            return false;
          } else if (filter) {
            return (
              doc.gameId.slice(0, filter.length) === filter ||
              doc.host.slice(0, filter.length) === filter
            );
          }
          return true;
        });
        setGames(data);
      });
    return () => {
      unsubscribe();
    };
  }, [filter]);

  return { games };
};

export default useGames;
