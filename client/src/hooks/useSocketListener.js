import { getSocket } from "../components/Socket";
import React, { useEffect, useState } from 'react';

const useSocketListener = (id) => {
    const socket = getSocket();
    const [playerHands, setPlayerHands] = useState({});
    const [countdown, setCountdown] = useState(null);

    const manageCards = ({card, player}) => {
        setPlayerHands(prevState => {
            var updated = {...prevState}
            if (player.id in updated) {
                updated[player.id].cards = [...updated[player.id].cards, card];
            } else {
                updated[player.id] = {};
                updated[player.id].cards = [card];
                updated[player.id].name = player.id;
            }
            return updated;
        })
    }

    useEffect(() => {
        if (socket == null) return;
        socket.on('countdown', (secs) => setCountdown(secs));
        socket.on('update-hands', manageCards);
        return () => {
            socket.off('countdown');
            socket.off('update-hand');
        }
    }, [])

    return {playerHands, countdown };
}

export default useSocketListener;