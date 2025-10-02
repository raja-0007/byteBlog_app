import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
import ChatHeader from '@/components/messenger components/ChatHeader'
import ChatFooter from '@/components/messenger components/ChatFooter'
import Chatspace from '@/components/messenger components/Chatspace'
import io from 'socket.io-client';
import axios from 'axios'
import { useUserContext } from '@/hooks/useCurrentUser'
import { useSocketContext } from '@/hooks/headSocket'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const chatPage = () => {
  const { currentUser, activeUsers, setUnread, unread } = useUserContext()
  const { ws, socketID, roomId, connectSocket } = useSocketContext()
  const { chatPage } = useLocalSearchParams()
  const [isSocketDisconnected, setIsSocketDisconnected] = useState(true)
  const [messages, setMessages] = useState([])
  const insets = useSafeAreaInsets()

  const getMessages = async () => {
    console.log('getting messages', { from: currentUser.username, to: chatPage, roomId: roomId, })
    let unreadmessages = {...unread}
    delete unreadmessages[chatPage]
    setUnread(unreadmessages)
    
    await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getMessages`,{
      params:{ from: currentUser.username, to: chatPage, roomId: roomId, }
    })
    .then((res)=>{
      console.log(res.data)
      setMessages(res.data)
    })
  }
  const wsRef = useRef(null);

  useEffect(() => {
    if (!ws) {
      console.log('socket not connected')
    } else {
      wsRef.current = ws;

      ws.emit('joinChat', { user1Id: currentUser.username, user2Id: chatPage });

      ws.on('message', (data) => {
        if (data.status === 'message saved') {
          setMessages(data.newMessages);
        } else if (!data.status) {
          setMessages(data.messages);
        }
      });
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.emit('leaveChat', { roomId });
      }
    };
  }, [ws, roomId, connectSocket])

  useEffect(()=>{
    if(roomId){
      getMessages()
    }
  },[roomId])

  const sendMessage = async (value) => {
    if (!ws) return;

    console.log('Sending message:', currentUser.username, chatPage, roomId, value, socketID);

    ws.emit('sendMessage', { 
        from: currentUser.username, 
        to: chatPage, 
        roomId, 
        message: value 
    }, (response) => {
        console.log('Message Acknowledgment:', response);
    });
  };

  return (
    <SafeAreaView edges={["top","bottom"]} className="flex-1 bg-white relative">
      <ChatHeader title={chatPage} active={activeUsers.some(x => x.username == chatPage)} sendMessage={sendMessage} type={'chat'} />
          <View className='h-[82vh]- flex-1 bg-gradient-to-b from-gray-50 pb- to-gray-100'>
            <Chatspace messages={messages} />
          </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // extraScrollHeight={Platform.OS === 'ios' ? 90 : 0}
        // style={{ flex: 1 }}
      >
          <ChatFooter sendMessage={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default chatPage