import { db, increment, del } from './firebase';

export const addPlayer = async (roomId, uid) => {
    await db.collection('rooms').doc(roomId).update({ 
        ['players.' + uid]: uid,
        size: increment(1)
    })
}

export const removePlayer = async (roomId, uid) => {
    await db.collection('rooms').doc(roomId).update({ 
        ['players.' + uid]: del()
    })
}