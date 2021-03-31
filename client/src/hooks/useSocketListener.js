import { getSocket } from "../components/Socket";
import React, { useEffect, useState } from 'react';

const useSocketListener = (id) => {
    const socket = getSocket();
    const [cards, setCards] = useState(null);
    const [otherCards, setOtherCards] = useState(null);

    const matchPlayer = (playerCards) => {
        setCards(playerCards[id].cards);
        delete playerCards[id];
        setOtherCards(playerCards);
    }

    useEffect(() => {
        if (socket == null) return;
        console.log(socket);
        socket.on('begin-game', matchPlayer);
        return () => {
            console.log("listener done");
            socket.off('begin-game');
        }
    }, [])

    return { cards, otherCards };
}

export default useSocketListener;