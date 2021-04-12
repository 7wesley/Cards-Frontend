import React, {useState, useEffect} from 'react';
import { disconnectSocket } from '../components/Socket';
import { db } from '../firebase';

const useRoomListener = (roomID, uid, setRoom) => {
    const [playersList, setPlayersList] = useState([]);
    const [maxPlayers, setMaxPlayers] = useState(0);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').doc(roomID)
        .onSnapshot(snap => {
            setPlayersList(snap.data().players);
            setMaxPlayers(snap.data().maxPlayers);
        })
        return () => {
            disconnectSocket();
            setRoom(null);
            unsubscribe();
        }
    }, [roomID])

    return { playersList, maxPlayers};
}

export default useRoomListener;