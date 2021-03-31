var { db, increment, decrement, del } = require('./firebase');
module.exports = {
    addPlayer: async (roomId, uid) => {
        await db.collection('rooms').doc(roomId).update({ 
            ['players.' + uid]: {name: uid, cards: []},
            size: increment(1)
        })
    },

    checkSize: async (roomId) => {
        var roomDoc = await db.collection('rooms').doc(roomId).get();
        if (Object.keys(roomDoc.data().players).length == 0) 
            await db.collection('rooms').doc(roomId).delete();
    },

    checkFull: async (roomId) => {
        var roomDoc = await db.collection('rooms').doc(roomId).get();
        if (Object.keys(roomDoc.data().players).length == roomDoc.data().maxPlayers) 
            return true;
        return false;
    },

    removePlayer: async (roomId, uid) => {
        await db.collection('rooms').doc(roomId).update({ 
            ['players.' + uid]: del(),
            size: increment(-1)
        })
    },

    queryUsers: async (roomId) => {
        var roomDoc = await db.collection('rooms').doc(roomId).get();
        return roomDoc.data().players;
    }

}
