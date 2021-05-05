import {useState, useEffect} from 'react';
import { db } from '../firebase'
const useGames = (filter) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snap => {
            let data = snap.docs.map(doc => doc.data());
            if (filter) 
                data = data.filter((doc) => 
                    doc.gameId.slice(0, filter.length) === filter || doc.gameId.slice(0, filter.length) === filter)
            setGames(data);
        })
        return () => {
            unsubscribe();
        }
    }, [filter])

    return { games };
}

export default useGames;