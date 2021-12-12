/**
 * Manages how users are connected to the gamerooms
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import io from "socket.io-client";
import { db, increment } from "../firebase";
let socket;

/**
 * Connects the the player to the room with the specific id via socket
 * @param {any} room the room to connect to
 * @param {any} id the identification of the user connecting to the room
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
 * A method made to test the wins of a user
 * @param {any} username the name of the user's account to test
 * @returns the snapshot of query that contains the user's information
 */
export const testingWins = async (username) => {
  var numberOfUsersRef = await db.collection("usernames").doc(username);

  var snapshot = await numberOfUsersRef.get("uid");
  //alert(snapshot.get("uid"))
  return await snapshot.get("uid");
};

/**
 * A Testing method to find if thiw way of updating wins works
 * @param {any} userID the id of the user
 */
export const updateWins = async (userID) => {
  await db
    .collection("users")
    .doc(userID)
    .update({
      "stats.wins": increment(1),
      "stats.played": increment(1),
    });
};

/**
 * Finds the wins of a user form the given userID
 * @param {any} userID the id of the user to get the wins for
 * @returns the snapshot of the query that contains the user's wins
 */
export const getWins = (userID) => {
  //return  Promise.resolve(db.collection('users').doc(userID).collection("stats").get("wins"));
  return Promise.resolve(db.collection("users").doc("tester").get("wins"));
};

/**
 * Gets the user's account id from a given username
 * @param {any} name the name of the user
 * @returns a snapshot of the query that contains the user's id
 */
export const getUID = (name) => {
  return Promise.resolve(db.collection("usernames").doc(name).get("uid"));
};

/**
 * Finds the socket
 * @returns the sockect
 */
export const getSocket = () => {
  return socket;
};
