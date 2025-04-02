import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useUserContext } from '@/hooks/useCurrentUser';
import { useSocketContext } from '@/hooks/headSocket';

const HeaderDiv = () => {

  const { currentUser, activeUsers, setActiveUsers, unread, setUnread  } = useUserContext()
  const { ws, socketID, connectSocket } = useSocketContext()


  useEffect(() => {
    // getMessages()

    if (ws) {

      ws.on('new_message', (data) => {
        console.log('Message from server:', data)
        // if (data.status == 'message saved') {
        //   // console.log('new me', data, [...(unread[data.newMessage.from] || []), data.newMessage.message])
        //   setUnread((prev) => ({
        //     ...prev,
        //     [data.newMessage.from]: [...(prev[data.newMessage.from] || []), data.newMessage.message]
        //   }));
        // }
        // else if (!data.status) {
        //   console.log('new message', data)
        // }
      });
    }
    else{
      // connectSocket(currentUser)
      console.log('socker not connected')
    }


    return () => {
      if (ws) {
        ws.off('new_message'); // Cleanup event listener
      }
    };
  }, []);


  return (
    <View className='bg-gray-200 p-5 flex flex-row items-center justify-between'>
      <View className='flex flex-row items-center'>
        <FontAwesome5 name="feather" size={24} color="black" />
        <Text className='text-xl'>ByteBlog</Text>
      </View>
      <View className='relative'>
        {Object.keys(unread).length !== 0 && <View className="mr-2 p-1 absolute top-[-10] right-[-10] z-50 flex-row items-center justify-center w-5 h-5 rounded-full bg-orange-400">
          <Text className="text-white">{Object.keys(unread)?.length}</Text>
        </View>}

        <FontAwesome6 onPress={() => router.push('/messenger')} name="facebook-messenger" size={24} color="black" />
      </View>

      {/* <AntDesign name="wechat" size={24} color="black" /> */}

    </View>
  )
}

export default HeaderDiv