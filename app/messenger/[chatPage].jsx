import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
import ChatHeader from '@/components/messenger components/ChatHeader'
import ChatFooter from '@/components/messenger components/ChatFooter'
import Chatspace from '@/components/messenger components/Chatspace'
import io from 'socket.io-client'; // Import socket.io-client
import axios from 'axios'
import { useUserContext } from '@/hooks/useCurrentUser'


const chatPage = () => {
  const {currentUser} = useUserContext()
  const { chatPage } = useLocalSearchParams()
  const [ws, setWs] = useState(null);
  const [isSocketDisconnected, setIsSocketDisconnected] = useState(true)
  const [messages, setMessages] = useState([])
  const [socketID, setSocketID] = useState(null)
  useEffect(() => {
    if (!ws) {
      const socket = io(process.env.EXPO_PUBLIC_BASE_URL, {
        transports: ['websocket'],
        forceNew: true,
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      setWs(socket);

      socket.on('connect', () => console.log('WebSocket connected'));
      socket.on('yourSocketId', (socketId) => {
        console.log('My socketId:', socketId);
        setSocketID(socketId);
        // You can now store this socketId on the client
      });
      socket.on('disconnect', () => console.log('Disconnected from server'));
      socket.on('message', (data) => {
        console.log('Message from server:', data)
        if (data.status == 'message saved') {
          setMessages(data.newMessages)
        }
        else {
          setMessages([
            {
              "from": "raja",
              "message": "Hi, did you get a chance to review the document I sent?",
              "sent_at": "9:15am",
              "date": "2024-12-11"
            },
            {
              "from": "user1",
              "message": "Yes, I did. It looks great, but I have a few suggestions.",
              "sent_at": "9:20am",
              "date": "2024-12-11"
            },
            {
              "from": "raja",
              "message": "Perfect. Let me know when you have time to discuss them.",
              "sent_at": "9:22am",
              "date": "2024-12-11"
            },
            {
              "from": "user1",
              "message": "We can connect after lunch, say 2 PM?",
              "sent_at": "9:25am",
              "date": "2024-12-11"
            },
            {
              "from": "raja",
              "message": "Sounds good. See you then!",
              "sent_at": "9:27am",
              "date": "2024-12-11"
            },
            {
              "from": "raja",
              "message": "I was thinking we could catch up over coffee. It’s been a while.",
              "sent_at": "10:20am",
              "date": "2024-12-12"
            },
            {
              "from": "user1",
              "message": "That sounds perfect! Let’s do it.",
              "sent_at": "10:22am",
              "date": "2024-12-12"
            },
            {
              "from": "raja",
              "message": "Great! How about Saturday at 3 PM?",
              "sent_at": "10:23am",
              "date": "2024-12-12"
            },
            {
              "from": "user1",
              "message": "Works for me. Do you have a place in mind?",
              "sent_at": "10:24am",
              "date": "2024-12-12"
            },
            {
              "from": "raja",
              "message": "There’s a new cafe downtown called 'Brew Haven'. Heard good things about it.",
              "sent_at": "10:26am",
              "date": "2024-12-12"
            },
            {
              "from": "user1",
              "message": "Perfect! Let’s meet there. Should I make a reservation?",
              "sent_at": "10:28am",
              "date": "2024-12-12"
            },
            {
              "from": "raja",
              "message": "That would be great, thanks! Let’s plan to meet at the entrance.",
              "sent_at": "10:30am",
              "date": "2024-12-12"
            },
            {
              "from": "user1",
              "message": "Got it. Looking forward to catching up!",
              "sent_at": "10:31am",
              "date": "2024-12-12"
            },
            {
              "from": "raja",
              "message": "Me too! See you on Saturday.",
              "sent_at": "10:32am",
              "date": "2024-12-12"
            }
          ]
          )

        }
      });
      socket.on('connect_error', (err) => console.error('Connection error:', err));

      return () => socket.disconnect(); // Cleanup
    }
  }, []);

  const sendMessage = async(value) => {
    // if (ws) {
      // ws.emit('message', 'Hello from the client!');
      // ws.emit('message', { from: currentUser, to: chatPage, message: value, socketId: socketID });
      console.log('sending message')
      await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/newMessage`,{ from: currentUser.username, to: chatPage, message: value, socketId: socketID })
      .then(res=>console.log('message sent'))
    // }
  };

  return (
    <SafeAreaWrapper>
      <View className='flex-1 relative'>
        <ChatHeader title={chatPage} sendMessage={sendMessage} type={'chat'} />
        <Chatspace messages={messages} />
        <ChatFooter sendMessage={sendMessage} />
      </View>

    </SafeAreaWrapper>

  )
}

export default chatPage