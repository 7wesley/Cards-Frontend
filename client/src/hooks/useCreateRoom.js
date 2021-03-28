import React, { useEffect } from 'react';
import { db } from '../firebase.js'

const useCreateRoom = () => {
    /*
    const [room, setRoom] = useState(null);

    useEffect(() => {
        let roomRef = db.collection('rooms').push({
            max_players: props.players,
        })
        setRoom(roomRef.key)
    }, [props])

    return { room }
    */
}

export default useCreateRoom;