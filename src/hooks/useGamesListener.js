/**
 * Finds a list of games through a given filter
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import { useState, useEffect } from "react";
import { db } from "../firebase";

/**
 * Gets the games that are returned after a filter is applied
 * @param {any} filter the filter to find a game by
 * @returns the games that are filtered through
 */
const useGames = (filter) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let data = snap.docs.map((doc) => doc.data());
        if (filter)
          data = data.filter(
            (doc) =>
              doc.gameId.slice(0, filter.length) === filter ||
              doc.host.slice(0, filter.length) === filter
          );
        setGames(data);
      });
    return () => {
      unsubscribe();
    };
  }, [filter]);

  return { games };
};

export default useGames;
