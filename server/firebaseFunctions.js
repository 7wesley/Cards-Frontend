var { db, increment, decrement, del } = require('./firebase');
module.exports = {
    addPlayer: async (roomId, uid) => {
        await db.collection('rooms').doc(roomId).update({ 
            ['players.' + uid]: uid,
            size: increment(1)
        })
    },

    checkSize: async (roomId) => {
        var roomDoc = await db.collection('rooms').doc(roomId).get();
        console.log(roomDoc.data().players);
        if (Object.keys(roomDoc.data().players).length == 0) 
            await db.collection('rooms').doc(roomId).delete();
    },

    removePlayer: async (roomId, uid) => {
        await db.collection('rooms').doc(roomId).update({ 
            ['players.' + uid]: del(),
            size: increment(-1)
        })
    },

}
