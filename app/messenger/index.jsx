import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ChatHeader from '@/components/messenger components/ChatHeader'
import axios from 'axios'
import { useUserContext } from '@/hooks/useCurrentUser'
import Octicons from '@expo/vector-icons/Octicons';
import { Searchbar } from 'react-native-paper';
import { useSocketContext } from '@/hooks/headSocket'


const index = () => {
  const { currentUser, activeUsers, setActiveUsers } = useUserContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [friendsList, setFriendsList] = useState([
    {
      "userId": "user1",
      "username": "user1",
      "latestMessage": {
        "commentby": "user1",
        "message": "helloo"
      }
    },
    {
      "userId": "user2",
      "username": "user2",
      "latestMessage": {
        "commentby": "user2",
        "message": "Hey there!"
      }
    },
    {
      "userId": "user3",
      "username": "user3",
      "latestMessage": {
        "commentby": "raja",
        "message": "Good morning!"
      }
    },
    {
      "userId": "user4",
      "username": "user4",
      "latestMessage": {
        "commentby": "user4",
        "message": "How's it going?"
      }
    },
    {
      "userId": "user5",
      "username": "user5",
      "latestMessage": {
        "commentby": "raja",
        "message": "What’s up?"
      }
    }
  ])
  const usersRef = useRef(null)
  const [allUsers, setAllUsers] = useState([])

  const [unread, setUnread] = useState({})
  const { ws, socketID, connectSocket } = useSocketContext()
  // const [activeUsers, setActiveUsers] = useState([])

  const [chats, setChats] = useState([])

  useFocusEffect(
    useCallback(() => {
      const getChats = async () => {
        console.log('currentuserrrrrrrrrrrrrrrrrrrrrrrrr in get chats', currentUser)
        const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getChats`, {
          params: { username: currentUser.username }
        })
        console.log('res for chatlists', res.data)
        setChats(res.data.chatList)
        setAllUsers(res.data.allUsers)

        setActiveUsers(res.data.activeUsers)
      }
      console.log('getting chats')
      getChats()


      // document.addEventListener('click', (e)=>{
      //     if(usersRef && usersRef.current && !usersRef.current.contains(e.nativeEvent.target)){
      //         console.log('clicked outside')
      //     }
      // })
    }, [currentUser])
  )

  useEffect(() => {
    // getMessages()

    if (ws) {

      ws.on('new_message', (data) => {
        // console.log('Message from server:', data)
        if (data.status == 'message saved') {
          console.log('new me', data, [...(unread[data.newMessage.from] || []), data.newMessage.message])
          setUnread((prev) => ({
            ...prev,
            [data.newMessage.from]: [...(prev[data.newMessage.from] || []), data.newMessage.message]
          }));
        }
        else if (!data.status) {
          console.log('new message', data)
        }
      });
    }
    else{
      connectSocket(currentUser)
    }
  }, []);

  // console.log('unread unread unread', unread)
  // useEffect(() => {
  //     const getChats = async () => {
  //         console.log('currentuserrrrrrrrrrrrrrrrrrrrrrrrr', currentUser)
  //         const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getChats`, {
  //             params: { username: currentUser.username }
  //         })
  //         console.log('res for chatlists', res.data)
  //         setChats(res.data.chatList)
  //         setActiveUsers(res.data.activeUsers)
  //     }
  //     getChats()
  // }, [currentUser])
  return (
    <SafeAreaWrapper>
      {/* <StatusBar style="auto" /> */}
      <ChatHeader title={'messenger'} type={'messenger'} />
      {/* <View>search and chat</View> */}
      <View className="px-5 py-2 relative">
        <Searchbar
          placeholder="Search chat"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: "#ebedef", // Light gray background
            //   border:'2px solid black',
            //   borderRadius: 8, // Rounded corners for a modern look
            paddingHorizontal: 10, // Additional padding for inner spacing
          }}
        />
        {allUsers.length > 0 && searchQuery !== "" ? (
          <ScrollView
            ref={usersRef}
            style={{
              position: "absolute",
              top: 60, // Adjust for visibility
              left: "5%", // Centered more effectively
              width: "100%",
              maxHeight: 400,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5, // For Android shadows
              zIndex: 1000, // Ensure visibility
            }}    >
            {allUsers
              .filter(
                (x) =>
                  x.username.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) &&
                  x.username !== currentUser.username
              )
              .map((item, i) => (
                <Text
                  onPress={() => {
                    setSearchQuery("");
                    router.push(`/messenger/${item.username}`);
                  }}
                  className="p-4 border-b z-50 border-gray-200 flex items-center gap-2 text-gray-700"
                  key={i}
                >
                  <FontAwesome name="user-circle" size={15} color="gray" />
                  {item.username}
                </Text>
              ))}
          </ScrollView>
        ) : null}
      </View>

      <View className='pt-2 px-5 flex flex-row items-center justify-start gap-1'>
        <Text>recent chats</Text>
        <MaterialCommunityIcons name="sort-reverse-variant" size={14} color="black" /></View>
      <ScrollView>
        {chats.map((item, i) => {
          return (
            <Pressable onPress={() => {
              router.push(`/messenger/${item.participants.filter(x => x !== currentUser.username)[0]}`)
              setSearchQuery('')
            }
            } key={i} className='px-5 py-4 border-b flex flex-row items-center justify-between border-gray-300'>
              <View className='flex flex-row gap-2 items-center'>
                <View className='relative'>
                  <FontAwesome name="user-circle" size={32} color="gray" />
                  {activeUsers.some(x => x.username == item.participants.filter(x => x !== currentUser.username)[0]) ? <Octicons name="dot-fill" size={24} color="#FFA500" className='absolute  bottom-[-5px] right-[-1px]' /> : null
                  }
                </View>
                <View >
                  <Text className='font-medium capitalize'>{item.participants.filter(x => x !== currentUser.username)[0]}</Text>
                  {Object.keys(unread).length === 0 || unread[item.participants.filter(x => x !== currentUser.username)[0]]?.length === 0
                    ? <Text className='text-gray-500'>{item.lastMessage.message}</Text>
                    : <Text className='text-orange-500'>
                      {unread[item.participants.filter(x => x !== currentUser.username)[0]]?.[unread[item.participants.filter(x => x !== currentUser.username)[0]]?.length - 1]}
                      {/* {unread[item.participants.filter(x => x !== currentUser.username)[0]]?.length} */}
                    </Text>
                  }
                </View>

              </View>
              <View>
                {Object.keys(unread).length !== 0 && unread[item.participants.filter(x => x !== currentUser.username)[0]]?.length !== 0 ?
                  <View className="flex-row items-center">
                    <View className="mr-2 p-1 flex-row items-center justify-center w-5 h-5 rounded-full bg-orange-400">
                      <Text className="text-white">{unread[item.participants.filter(x => x !== currentUser.username)[0]]?.length}</Text>
                    </View>
                    <Text className="text-gray-500">11:30</Text>
                  </View>
                  :
                  <Text className='text-gray-500'>11:30</Text>
                }

              </View>


            </Pressable>
          )
        })}

      </ScrollView>
    </SafeAreaWrapper>

  )
}

export default index