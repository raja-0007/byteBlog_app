import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useUserContext } from '@/hooks/useCurrentUser'

const Chatspace = ({ messages }) => {
  const [groupedMessages, setGroupedMessages] = useState({})
  const chatSpaceRef = useRef(null)
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const { currentUser } = useUserContext()

  useEffect(() => {
    if (messages.length > 0) {
      const groupedData = groupChatsByDate(messages, sortGroupedChats)
      setGroupedMessages(groupedData)
    }
  }, [messages])

  useEffect(() => {
    if (chatSpaceRef && chatSpaceRef.current) {
      chatSpaceRef.current.scrollToEnd({ animated: false })
    }
  }, [groupedMessages])

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (contentHeight > 0 && !isContentLoaded) {
      setIsContentLoaded(true);
    }
  };

  function sortGroupedChats(groupedChats) {
    const sortedGroupedChats = Object.keys(groupedChats)
      .sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        return dateA - dateB;
      })
      .reduce((sortedAcc, date) => {
        sortedAcc[date] = groupedChats[date];
        return sortedAcc;
      }, {});
    return sortedGroupedChats;
  }

  function groupChatsByDate(chats, callback) {
    const groupedChats = chats.reduce((acc, chat) => {
      const { date } = chat;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(chat);
      return acc;
    }, {});
    if (callback && typeof callback === "function") {
      return callback(groupedChats);
    }
    return groupedChats;
  }

  function extractTime(isoString) {
    const date = new Date(isoString);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString([], options);
  }

  return (
    <ScrollView 
      ref={chatSpaceRef} 
      className='flex-1 bg-gray-50 px-4' 
      contentContainerStyle={{ paddingBottom: 20, paddingTop: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {Object.keys(groupedMessages).map((date, di) => {
        return (
          <View className='flex flex-col gap-3 mb-6' key={di}>
            {/* Date Separator */}
            <View className='flex flex-row items-center justify-center mb-2'>
              <View className='h-[0.5px] flex-1 bg-gray-300'></View>
              <Text className='bg-gray-200 text-gray-600 px-4 py-1 text-xs font-medium mx-3 rounded-full'>
                {date}
              </Text>
              <View className='h-[0.5px] flex-1 bg-gray-300'></View>
            </View>

            {/* Messages */}
            {groupedMessages[date].map((message, i) => {
              const sentAt = extractTime(message.sentAt)
              const isCurrentUser = message.from === currentUser.username
              
              return (
                <View 
                  key={i} 
                  className={`max-w-[80%] flex gap-2 ${isCurrentUser ? 'self-end flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <View className={`h-8 w-8 rounded-full ${isCurrentUser ? 'bg-orange-500' : 'bg-blue-500'} flex items-center justify-center shadow-sm`}>
                    <FontAwesome name="user" size={14} color="white" />
                  </View>
                  
                  {/* Message Bubble */}
                  <View className='flex-'>
                    <View 
                      className={`p-3 rounded-2xl shadow-sm ${
                        isCurrentUser 
                          ? 'bg-orange-100 rounded-tr-sm border border-orange-300' 
                          : 'bg-white rounded-tl-sm border border-gray-200'
                      }`}
                    >
                      <Text 
                        className={`text-base leading-5 ${
                          isCurrentUser ? 'text-gray-800' : 'text-gray-800'
                        }`}
                      >
                        {message.message}
                      </Text>
                    </View>
                    
                    {/* Timestamp */}
                    <Text 
                      className={`text-[10px] text-gray-500 mt-1 ${
                        isCurrentUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {sentAt}
                    </Text>
                  </View>
                </View>
              )
            })}
          </View>
        )
      })}
    </ScrollView>
  )
}

export default Chatspace