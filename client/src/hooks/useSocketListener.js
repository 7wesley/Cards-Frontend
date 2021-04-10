import { getSocket } from "../components/Socket";
import React, { useEffect, useState } from 'react';

const useSocketListener = (id) => {
    const socket = getSocket();
    const [playerHands, setPlayerHands] = useState({});
    const [countdown, setCountdown] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [timer, setTimer] = useState(null);
    const [turn, setTurn] = useState();

    const manageCards = ({id, card}) => {
        setPlayerHands(prevState => {
            var updated = {...prevState}
            if (id in updated) {
                updated[id].cards = [...updated[id].cards, card];
            } else {
                updated[id] = {};
                updated[id].cards = [card];
                updated[id].name = id;
            }
            return updated;
        })
    }

    useEffect(() => {
        if (socket == null) return;
        socket.on('countdown', (secs) => setCountdown(secs));
        socket.on('update-hands', manageCards);
        socket.on('curr-turn', (user) => setTurn(user));
        socket.on('your-turn', (msg) => setPrompt(msg));
        socket.on('timer', (secs) => setTimer(secs));
        return () => {
            socket.off('countdown');
            socket.off('update-hand');
        }
    }, [])

    return {playerHands, countdown, prompt, turn, timer};
}

export default useSocketListener;