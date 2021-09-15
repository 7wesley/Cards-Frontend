/**
 * The functions that can be
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */
var { db, del } = require("./firebase");
module.exports = {
    /**
     * Adds a player to a room in the database.
     * @param {*} roomId - The room to add the player to
     * @param {*} uid - The uid of the player being added
     */
    addPlayer: async (roomId, uid) => {
        await db
            .collection("rooms")
            .doc(roomId)
            .update({
                ["players." + uid]: uid,
            });
    },

    /**
     * Deletes a room from the database.
     * @param {} roomId - The room to be deleted
     */
    deleteRoom: async (roomId) => {
        await db.collection("rooms").doc(roomId).delete();
    },

    /**
     * Checks if a room has met its player quota
     * @param {} roomId - The room that will have its player count checked
     * @returns true if the room is full, else false
     */
    checkFull: async (roomId) => {
        var roomDoc = await db.collection("rooms").doc(roomId).get();
        if (
            Object.keys(roomDoc.data().players).length ==
            roomDoc.data().maxPlayers
        ) {
            await db.collection("rooms").doc(roomId).update({
                status: "in-progress",
            });
            return true;
        }
        return false;
    },

    /**
     * Removes a player from a room in the database.
     * @param {} roomId - The room to remove a player from
     * @param {*} uid - The player to be removed
     */
    removePlayer: async (roomId, uid) => {
        await db
            .collection("rooms")
            .doc(roomId)
            .update({
                ["players." + uid]: del(),
            });
    },

    /**
     * Gets a list of all the players in a room.
     * @param {*} roomId - The room who's player list will be queried
     * @returns The player list, otherwise null if the room is deleted
     * during the query process
     */
    queryUsers: async (roomId) => {
        try {
            var roomDoc = await db.collection("rooms").doc(roomId).get();
            return roomDoc.data().players;
        } catch {
            return null;
        }
    },

    /**
     * Queries the database for the type of game in a room.
     * @param {*} roomId - The room who's game type will be checked
     * @returns The game type of the current room
     */
    queryGame: async (roomId) => {
        var roomDoc = await db.collection("rooms").doc(roomId).get();
        return roomDoc.data().game;
    },

    /**
     * Queries the database for the max number of players in a room.
     * @param {*} roomId - The room who's max player count will be checked
     * @returns the max number of players, otherwise 0 if an error occurs
     */
    queryMax: async (roomId) => {
        try {
            var roomDoc = await db.collection("rooms").doc(roomId).get();
            return roomDoc.data().maxPlayers;
        } catch {
            return 0;
        }
    },

    /**
     * Sets the status of a room in the database
     * @param {*} roomId - The room who's status will be set
     * @param {*} status - The status to set the room to
     */
    setStatus: async (roomId, status) => {
        await db.collection("rooms").doc(roomId).update({
            status,
        });
    },
};
