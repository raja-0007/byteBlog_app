import React, { createContext, useContext, useState } from 'react';
import io from 'socket.io-client'; // Import socket.io-client
import { useUserContext } from './useCurrentUser';

const SocketContext = createContext();



export const SocketProvider = ({ children }) => {
    const { setUnread } = useUserContext()
    const [ws, setWs] = useState(null);
    const [socketID, setSocketID] = useState(null)
    const [roomId, setRoomId] = useState(null)

    const connectSocket = async (currentUser) => {
        if (!ws) {
            const socket = io(process.env.EXPO_PUBLIC_BASE_URL, {
                transports: ['websocket'],
                // forceNew: true,
                reconnectionAttempts: 5,
                timeout: 10000,
                query:{
                    username: currentUser.username,
                    email: currentUser.email
                }
            });

            setWs(socket);
            socket.on('connect', () => {
                console.log('WebSocket connected')
            });
            socket.on('yourSocketId', (socketId) => {
                console.log('My socketId:', socketId);
                setSocketID(socketId);
                // You can now store this socketId on the client
            });

            socket.on('new_message', (data) => {
                console.log('Message from server:', data)
                if (data.status == 'message saved') {
                  // console.log('new me', data, [...(unread[data.newMessage.from] || []), data.newMessage.message])
                  setUnread((prev) => ({
                    ...prev,
                    [data.newMessage.from]: [...(prev[data.newMessage.from] || []), data.newMessage.message]
                  }));
                }
                else if (!data.status) {
                  console.log('new message', data)
                }
              });
            socket.on('disconnect', () => console.log('Disconnected from server'));
            
            socket.on('joinedChat', (data) => {
                setRoomId(data.roomId)
            })
            socket.on('connect_error', (err) => console.error('Connection error:', err));

            return () => socket.disconnect(); // Cleanup
        }
    }

    return (
        <SocketContext.Provider value={{ 
            ws, setWs, 
            connectSocket, 
            socketID, roomId, 
         }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => useContext(SocketContext)
