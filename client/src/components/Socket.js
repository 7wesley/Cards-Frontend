/**
 * Manages how users are connected to the gamerooms
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import io from 'socket.io-client';
import { db, increment } from '../firebase';
let socket;

//Connects the the player to the room with the specific id via socket
export const connectSocket = (room, id) => {
    socket = io(
        'http://localhost:5000', {
        transports: ['websocket', 'polling', 'flashsocket'],
    })
    if (socket && room) socket.emit('join', room, id);
}

//Disconnects the user from the room by terminating the connection 
//  from the socket
export const disconnectSocket = () => {
    console.log('User disconnecting');
    if (socket) socket.disconnect();
}


export const testingWins = async (username) =>{
    var numberOfUsersRef = await db
    .collection('usernames')
    .doc(username);

    var snapshot = await numberOfUsersRef.get("uid");
    //alert(snapshot.get("uid"))
    return await snapshot.get("uid");
}

export const updateWins = async (userID) =>{
    await db.collection('users').doc(userID).update({
        "stats.wins": increment(1),
        "stats.played": increment(1)
    }) 
}

export const getWins = (userID) =>{
    //return  Promise.resolve(db.collection('users').doc(userID).collection("stats").get("wins"));
    return Promise.resolve(db.collection('users').doc("tester").get("wins"));
}

export const getUID = (name) =>{
    return Promise.resolve(db.collection('usernames').doc(name).get("uid"));
}

export const getSocket = () => {
    return socket;
}