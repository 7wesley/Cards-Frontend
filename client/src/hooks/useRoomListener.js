import React, {useState, useEffect} from 'react';
import { disconnectSocket } from '../components/Socket';
import { db } from '../firebase';

const useRoomListener = (roomID, uid, setRoom) => {
    const [players, setPlayers] = useState([]);
    const [full, setFull] = useState([]);
    const [maxPlayers, setMaxPlayers] = useState(0);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').doc(roomID)
        .onSnapshot(snap => {
            setPlayers(snap.data().players);
            setFull(snap.data().full);
            setMaxPlayers(snap.data().maxPlayers);
        })
        return () => {
            disconnectSocket();
            setRoom(null);
            unsubscribe();
        }
    }, [roomID])

    return { players, full, maxPlayers };
}

export default useRoomListener;