import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ChatHeader from '@/components/messenger components/ChatHeader'
import axios from 'axios'
import { useUserContext } from '@/hooks/useCurrentUser'

const index = () => {
    const {currentUser} = useUserContext()
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

    const [chats, setChats] = useState([])

    useEffect(()=>{
        const getChats = async()=>{
            console.log('currentuserrrrrrrrrrrrrrrrrrrrrrrrr', currentUser)
        const chatList = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getChats`,{
            params: { username: currentUser.username }
        })
        console.log('chatLIst', chatList.data)
        setChats(chatList.data)
    }
        getChats()
    },[])
    return (
        <SafeAreaWrapper>
            {/* <StatusBar style="auto" /> */}
            <ChatHeader title={'messenger'} type={'messenger'}/>
            {/* <View>search and chat</View> */}
            <View className='pt-2 px-5 flex flex-row items-center justify-start gap-1'>
                <Text>recent chats</Text>
                <MaterialCommunityIcons name="sort-reverse-variant" size={14} color="black" /></View>
            <ScrollView>
                {chats.map((item, i) => {
                    return (
                        <Pressable onPress={() => router.push(`/messenger/${item.participants.filter(x=>x!==currentUser.username)[0]}`)} key={i} className='px-5 py-4 border-b flex flex-row items-center justify-between border-gray-300'>
                            <View className='flex flex-row gap-2 items-center'>
                                <FontAwesome name="user-circle" size={32} color="gray" />
                                <View >
                                    <Text className='font-medium capitalize'>{item.participants.filter(x=>x!==currentUser.username)[0]}</Text>
                                    <Text className='text-gray-500'>{item.lastMessage.message}</Text>
                                </View>

                            </View>
                            <View><Text className='text-gray-500'>11:30</Text></View>


                        </Pressable>
                    )
                })}

            </ScrollView>
        </SafeAreaWrapper>

    )
}

export default index