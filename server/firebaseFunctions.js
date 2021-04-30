var { db, del } = require('./firebase');
module.exports = {
    addPlayer: async (roomId, uid) => {
        await db.collection('rooms').doc(roomId).update({ 
            ['players.' + uid]: uid,
        })
    },

    deleteRoom: async (roomId) => {
        await db.collection('rooms').doc(roomId).delete();
    },

    checkFull: async (roomId) => {
        var roomDoc = await db.collection('rooms').doc(roomId).get();
        if (Object.keys(roomDoc.data().players).length == roomDoc.data().maxPlayers) {
            await db.collection('rooms').doc(roomId).update({
                status: 'in-progress'
            })
            return true;
        }
        return false;
    },

    removePlayer: async (roomId, uid) => {
        await db.collection('rooms').doc(roomId).update({ 
            ['players.' + uid]: del(),
        })
    },

    queryUsers: async (roomId) => {
        try {
            var roomDoc = await db.collection('rooms').doc(roomId).get();
            return roomDoc.data().players;
        } catch {
            console.log("Player left before game started");
            return null;
        }
    },

    queryGame: async (roomId) => {
        var roomDoc = await db.collection('rooms').doc(roomId).get();
        return roomDoc.data().game;
    },

    queryMax: async (roomId) => {
        try {
            var roomDoc = await db.collection('rooms').doc(roomId).get();
            return roomDoc.data().maxPlayers;
        } catch {
            return 0;
        }
    },

    setStatus: async (roomId, status) => {
        await db.collection('rooms').doc(roomId).update({ 
            status
        })
    }

}
