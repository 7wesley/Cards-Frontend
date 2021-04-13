import { getSocket } from "../components/Socket";
import React, { useEffect, useState } from 'react';

const useSocketListener = (id) => {
    const socket = getSocket();
    const [players, setPlayers] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [timer, setTimer] = useState(null);
    const [turn, setTurn] = useState();
    const [message, setMessage] = useState("");
    const [winners, setWinners] = useState();
    
    useEffect(() => {
        if (socket == null) return;
        socket.on('countdown', (secs) => setCountdown(secs));
        socket.on('update-hands', (plyrs) => setPlayers(plyrs));
        socket.on('curr-turn', (user) => setTurn(user));
        socket.on('your-turn', (msg) => setPrompt(msg));
        socket.on('timer', (secs) => setTimer(secs));
        socket.on('alert', (msg) => setMessage(msg));
        socket.on('winners', (winList) => setWinners(winList));
        return () => {
            socket.off('countdown');
            socket.off('update-hand');
        }
    }, [])

    return {players, countdown, prompt, turn, timer, message, winners};
}

export default useSocketListener;