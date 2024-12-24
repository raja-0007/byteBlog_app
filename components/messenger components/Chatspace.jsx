import { View, Text, ScrollView, Pressable } from 'react-native'
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
      const groupedData = groupChatsByDate(messages)
      setGroupedMessages(groupedData)

    }
  }, [messages])

  useEffect(() => {
    if (chatSpaceRef && chatSpaceRef.current) {
      // setTimeout(() => {
      chatSpaceRef.current.scrollToEnd({ animated: false })

      // }, 0.1);
    }

  }, [groupedMessages])

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (contentHeight > 0 && !isContentLoaded) {
      setIsContentLoaded(true); // Set flag to indicate content is loaded
    }
  };


  function groupChatsByDate(chats) {
    return chats.reduce((acc, chat) => {
      const { date } = chat;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(chat);
      return acc;
    }, {});
  }

  return (
    <ScrollView ref={chatSpaceRef} className='h-[84vh] relative flex flex-col gap-2 px-2' contentContainerStyle={{ paddingBottom: 20 }}>
      {Object.keys(groupedMessages).map((date, di) => {
        return (
          <View className='flex flex-col gap-4 mt-7' key={di}>
            <View className='flex flex-row px-5 items-center justify-between'>
              <View className='h-[1px] w-[35%] bg-gray-400'></View>
              <Text style={{
                alignSelf: 'flex-start',
                // textAlign: 'right',
              }} className='bg-gray-500 text-white p-1 py-0 text-sm mx-auto rounded-md w-[max-content]'>{date}</Text>
              <View className='h-[1px] w-[35%] bg-gray-400'></View>
            </View>


            {groupedMessages[date].map((message, i) => {
              return (
                <View key={i} className={` max-w-[70%] flex gap-1 items-end ${message.from == currentUser.username ? 'self-end flex-row-reverse' : 'flex-row'}`}>
                  <FontAwesome name="user-circle" size={20} color="black" className='' />
                  <View className='bg-gray-200 p-2 rounded-md '><Text style={{
                    alignSelf: 'flex-start',
                    // textAlign: 'right',
                  }}
                    className='w-[max-content]'>{message.message}</Text>
                    <Text className='text-end self-end text-xs'>{message.sent_at}</Text>
                  </View>

                </View>
              )
            })}

          </View>
        )
      })}

      {/* <Text className='py-20'>[chatPage]</Text>
      <Text className='py-20'>[chatPage]</Text>
      <Text className='py-20'>[chatPage]</Text>
      <Text className='py-20'>[chatPage]</Text>
      <Text className='py-20'>[chatPage]</Text>
      <Text className='py-20'>[chatPage]</Text> */}
    </ScrollView>
  )
}

export default Chatspace