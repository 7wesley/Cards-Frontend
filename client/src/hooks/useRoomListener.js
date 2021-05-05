import {useState, useEffect} from 'react';
import { db } from '../firebase';

const useRoomListener = (room) => {
    const [playersList, setPlayersList] = useState({});
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [status, setStatus] = useState();

    useEffect(() => {
        const listener = async () => {
            let doc = await db.collection('rooms').doc(room).get();
            if (doc.exists) {
                const unsubscribe = db.collection('rooms').doc(room)
                .onSnapshot(snap => {
                    if (snap.data()) {
                        setPlayersList(snap.data().players);
                        setMaxPlayers(snap.data().maxPlayers);
                        setStatus(snap.data().status);
                    }
                    else 
                        setPlayersList(null);
                })
                return () => unsubscribe();
            }
            setPlayersList(null);
        }
        listener();
    }, [room])

    return { playersList, maxPlayers, status};
}

export default useRoomListener;