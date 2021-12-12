/**
 * Methods for connecting, disconnecting, and getting information
 * about this socket
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 */

import io from "socket.io-client";

let socket;

/**
 * Connects the the player's socket to the server
 * @param {*} room the room to connect to
 * @param {*} id the identification of the user connecting to the room
 */
export const connectSocket = (room, id, image) => {
  socket = io(process.env.REACT_APP_BACKEND_URL, {
    transports: ["websocket", "polling", "flashsocket"],
  });
  if (socket && room) socket.emit("join", room, id, image);
};

/**
 * Disconnects the user from the room by terminating the connection
 * from the socket
 */
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

/**
 * Finds the socket
 * @returns the sockect
 */
export const getSocket = () => {
  return socket;
};
