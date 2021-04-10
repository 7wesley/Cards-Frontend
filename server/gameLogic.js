module.exports = {
    blackjack: async (roomId, uid) => {
        await db.collection('rooms').doc(roomId).update({ 
            ['players.' + uid]: uid,
            size: increment(1),

        })
    },
}
