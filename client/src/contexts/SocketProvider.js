import React, { useContext, useEffect,useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ room, children }) => {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000', {
            transports: ['websocket', 'polling', 'flashsocket'],
            query: { id }}
        )
        setSocket(newSocket)
        console.log(newSocket);
        //removes old socket if useEffect runs a second time
        return () => newSocket.close();
    }, [room])

    return (
        <SocketContext.Provider value={socket}>
            { children }
        </SocketContext.Provider>
    )
}
