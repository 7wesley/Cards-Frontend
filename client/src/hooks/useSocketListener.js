import { getSocket, disconnectSocket } from "../components/Socket";
import { useEffect, useState } from 'react';

const useSocketListener = (connected) => {
    const socket = getSocket();
    const [players, setPlayers] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [timer, setTimer] = useState(null);
    const [turn, setTurn] = useState();
    const [message, setMessage] = useState("");
    const [winners, setWinners] = useState();
    
    useEffect(() => {
        //prevents socket from connecting if room is full
        if (connected) {
            console.log('connected')
            socket.on('countdown', (secs) => setCountdown(secs));
            socket.on('update-hands', (plyrs) => setPlayers(plyrs));
            socket.on('curr-turn', (user) => setTurn(user));
            socket.on('your-turn', (msg) => setPrompt(msg));
            socket.on('timer', (secs) => setTimer(secs));
            socket.on('alert', (msg) => setMessage(msg));
            socket.on('winners', (winList) => setWinners(winList));
            return () => {
                console.log('dc');
                disconnectSocket();
            }
        }
    }, [connected, socket])

    return {players, countdown, prompt, turn, timer, message, winners};
}

export default useSocketListener;