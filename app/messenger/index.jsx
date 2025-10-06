import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
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
import { SafeAreaView } from 'react-native-safe-area-context'


const index = () => {
  const { currentUser, activeUsers, setActiveUsers, unread, setUnread } = useUserContext()
  const [searchQuery, setSearchQuery] = useState('')
  // Dummy data for visualization
  const [friendsList, setFriendsList] = useState([
    {
      "userId": "user1",
      "username": "user1",
      "latestMessage": {
        "commentby": "user1",
        "message": "helloo"
      }
    },
    // ... other dummy users
  ])
  const usersRef = useRef(null)
  const [allUsers, setAllUsers] = useState([])

  const { ws, socketID, connectSocket } = useSocketContext()

  const [chats, setChats] = useState([])
  const getChats = async () => {
    // console.log('currentuserrrrrrrrrrrrrrrrrrrrrrrrr in get chats', currentUser)
    if (!currentUser?.username) return; // Guard clause
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getChats`, {
        params: { username: currentUser.username }
      })
      // console.log('res for chatlists', res.data)
      setChats(res.data.chatList)
      setAllUsers(res.data.allUsers)
      setActiveUsers(res.data.activeUsers)
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  }

  useEffect(()=>{
    getChats();
  },[])
  // useFocusEffect(
  //   useCallback(() => {
  //     // console.log('Fetching chats...');
  //     getChats();
  //     return () => {
  //       // console.log('Cleanup on screen blur');
  //     };
  //   }, [currentUser]) // Re-run if currentUser changes
  // )

  useEffect(() => {
    if (!ws || !currentUser) return;
    const handleStatus = ({ username, status }) => {
      console.log('Message from server:', username, status, chats)
      setActiveUsers((prev) => {
        const user = chats.find(c => c.participants.includes(username) && username !== currentUser.username);
        console.log('user', user)
        if (!user) return prev;
  
        if (status === "online") {
          const alreadyOnline = prev.some(u => u.username === username);
          if (!alreadyOnline) return [...prev, { username }];
          return prev;
        } else if (status === "offline") {
          return prev.filter(u => u.username !== username);
        }
        return prev;
      });
    }
  
    ws.on('update-user-status', handleStatus);
  
    return () => {
      ws.off('update-user-status', handleStatus);
    };
  }, [ws, chats, currentUser.username]);

  return (
    // Changed SafeAreaView background to a soft orange
    <SafeAreaView className="bg-white flex-1">
      <ChatHeader title={'messenger'} type={'messenger'} />

      {/* Search Bar Section */}
      <View className="px-4 py-2 relative z-10">
        <Searchbar
          placeholder="Search or start a new chat"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: "#fff",
            borderRadius: 30, // Make it more pill-shaped
            borderWidth: 1,
            borderColor: '#fed7aa', // Light orange border (orange-200)
            elevation: 2, // Subtle shadow for depth
          }}
          inputStyle={{
            fontSize: 14,
          }}
          iconColor='#fb923c' // Orange icon color
        />
        {allUsers.length > 0 && searchQuery !== "" && (
          <ScrollView
            ref={usersRef}
            className="absolute top-16 w-full self-center max-h-80 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            {allUsers
              .filter(
                (x) =>
                  x.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  x.username !== currentUser.username
              )
              .map((item, i) => (
                <Pressable
                  onPress={() => {
                    setSearchQuery("");
                    router.push(`/messenger/${item.username}`);
                  }}
                  key={i}
                  className="p-4 border-b border-gray-100 flex-row items-center gap-3 active:bg-orange-100"
                >
                  <FontAwesome name="user-circle" size={24} color="#fb923c" />
                  <Text className="text-gray-800 text-base">{item.username}</Text>
                </Pressable>
              ))}
          </ScrollView>
        )}
      </View>

      {/* Recent Chats Title */}
      <View className='pt-2 pb-1 px-5 flex flex-row items-center justify-start gap-2'>
        <Text className="text-lg font-bold text-gray-800">Recent Chats</Text>
        <MaterialCommunityIcons name="sort-reverse-variant" size={16} color="black" />
      </View>

      {/* Chat List */}
      <ScrollView>
        {chats.map((item, i) => {
          const otherUser = item.participants.find(x => x !== currentUser.username);
          const userUnreadMessages = unread[otherUser] || [];
          const hasUnread = userUnreadMessages.length > 0;
          return (
            // Using Pressable for better feedback on touch
            <Pressable
              onPress={() => {
                router.push(`/messenger/${otherUser}`);
                setSearchQuery('');
              }}
              key={i}
              // Changed to a card-style UI with shadows and rounded corners
              className='bg-white flex-1 rounded-xl mx- my-1 p-3 flex-row items-center justify-between shadow-sm active:bg-gray-100'
            >
              <View className='flex-1 flex-row gap-3 items-center'>
                <View className='relative'>
                  <FontAwesome name="user-circle" size={40} color="#DCDCDC" />
                  {activeUsers.some(x => x.username === otherUser) &&
                    <Octicons name="dot-fill" size={24} color="#22c55e" style={{ position: 'absolute', bottom: -5, right: -4 }} />
                  }
                </View>
                <View className="flex-1">
                  <Text className='font-semibold text-base capitalize text-gray-900'>{otherUser}</Text>
                  <Text
                    numberOfLines={1}
                    className={hasUnread ? 'text-orange-500 font-bold' : 'text-gray-500'}
                  >
                    {hasUnread
                      ? userUnreadMessages[userUnreadMessages.length - 1]
                      : item.lastMessage.message
                    }
                  </Text>
                </View>
              </View>

              <View className="items px-4">
                <Text className='text-gray-400 text-xs mb-1'>11:30</Text>
                {hasUnread &&
                  <View className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <Text className="text-white font-bold text-xs">{userUnreadMessages.length}</Text>
                  </View>
                }
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default index