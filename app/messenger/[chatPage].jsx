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
import { useSocketContext } from '@/hooks/headSocket'

const chatPage = () => {
  const { currentUser, activeUsers } = useUserContext()
  const { ws, socketID, roomId } = useSocketContext()
  const { chatPage } = useLocalSearchParams()
  const [isSocketDisconnected, setIsSocketDisconnected] = useState(true)
  const [messages, setMessages] = useState([])

  const getMessages = async () => {
    console.log('getting messages')
    // setMessages([
    //   {
    //     "from": "raja",
    //     "message": "Hi, did you get a chance to review the document I sent?",
    //     "sent_at": "9:15am",
    //     "date": "2024-12-11"
    //   },
    //   {
    //     "from": "user1",
    //     "message": "Yes, I did. It looks great, but I have a few suggestions.",
    //     "sent_at": "9:20am",
    //     "date": "2024-12-11"
    //   },
    //   {
    //     "from": "raja",
    //     "message": "Perfect. Let me know when you have time to discuss them.",
    //     "sent_at": "9:22am",
    //     "date": "2024-12-11"
    //   },
    //   {
    //     "from": "user1",
    //     "message": "We can connect after lunch, say 2 PM?",
    //     "sent_at": "9:25am",
    //     "date": "2024-12-11"
    //   },
    //   {
    //     "from": "raja",
    //     "message": "Sounds good. See you then!",
    //     "sent_at": "9:27am",
    //     "date": "2024-12-11"
    //   },
    //   {
    //     "from": "raja",
    //     "message": "I was thinking we could catch up over coffee. It’s been a while.",
    //     "sent_at": "10:20am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "user1",
    //     "message": "That sounds perfect! Let’s do it.",
    //     "sent_at": "10:22am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "raja",
    //     "message": "Great! How about Saturday at 3 PM?",
    //     "sent_at": "10:23am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "user1",
    //     "message": "Works for me. Do you have a place in mind?",
    //     "sent_at": "10:24am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "raja",
    //     "message": "There’s a new cafe downtown called 'Brew Haven'. Heard good things about it.",
    //     "sent_at": "10:26am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "user1",
    //     "message": "Perfect! Let’s meet there. Should I make a reservation?",
    //     "sent_at": "10:28am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "raja",
    //     "message": "That would be great, thanks! Let’s plan to meet at the entrance.",
    //     "sent_at": "10:30am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "user1",
    //     "message": "Got it. Looking forward to catching up!",
    //     "sent_at": "10:31am",
    //     "date": "2024-12-12"
    //   },
    //   {
    //     "from": "raja",
    //     "message": "Me too! See you on Saturday.",
    //     "sent_at": "10:32am",
    //     "date": "2024-12-12"
    //   }
    // ]
    // )
    await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getMessages`,{
      params:{ from: currentUser.username, to: chatPage, roomId: roomId, }
    })
    .then((res)=>{
      console.log(res.data)
      // setMessages(res.data)
    })
  }
  useEffect(() => {
    // getMessages()

    if (ws) {
      ws.emit('joinChat', { user1Id: currentUser.username, user2Id: chatPage })

      ws.on('message', (data) => {
        // console.log('Message from server:', data)
        if (data.status == 'message saved') {
          setMessages(data.newMessages)
        }
        else if(!data.status){
          setMessages(data.messages)
        }
      });
    }

    return () => {
      ws.emit('leaveChat', { roomId })
    }
  }, []);

  useEffect(()=>{
    if(roomId && messages.length===0){
      getMessages()
    }
  },[roomId])


  const sendMessage = async (value) => {
    // if (ws) {
    // ws.emit('message', 'Hello from the client!');
    // ws.emit('message', { from: currentUser, to: chatPage, message: value, socketId: socketID });
    console.log('sending message')
    await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/newMessage`, { from: currentUser.username, to: chatPage, roomId: roomId, message: value, socketId: socketID })
      .then(res => console.log('message sent'))
    // }
  };

  console.log('active user testtttttttttttt>>>>>>>>>>>>>>>.',activeUsers, chatPage, activeUsers.some(x => x.username !== chatPage) )

  return (
    <SafeAreaWrapper>
      <View className='flex-1 relative'>
        <ChatHeader title={chatPage} active={activeUsers.some(x => x.username == chatPage)} sendMessage={sendMessage} type={'chat'} />
        <Chatspace messages={messages} />
        <ChatFooter sendMessage={sendMessage} />
      </View>

    </SafeAreaWrapper>

  )
}

export default chatPage