import { getSocket, disconnectSocket } from "../components/Socket";
import { useEffect, useState } from "react";

/**
 * Listens for any messages emitted from the server and returns it
 * with a state hook
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} connected - if the user is connected to the server
 * @returns the data emitted from the server
 */
const useSocketListener = (connected) => {
  const socket = getSocket();
  const [players, setPlayers] = useState([]);
  const [timer, setTimer] = useState(null);
  const [turn, setTurn] = useState(null);
  const [results, setResults] = useState(null);
  const [chatMsg, setChatMsg] = useState(null);

  useEffect(() => {
    //prevents socket from connecting if room is full
    if (connected) {
      socket.on("update-hands", (plyrs) => setPlayers(plyrs));
      socket.on("curr-turn", (user) => setTurn(user));
      socket.on("timer", (secs) => setTimer(secs));
      socket.on("results", (results) => setResults(results));
      socket.on("chat-message", (msg) => setChatMsg(msg));
      return () => {
        disconnectSocket();
      };
    }
  }, [connected, socket]);

  return { players, turn, timer, results, chatMsg };
};

export default useSocketListener;
