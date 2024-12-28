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
    // const [activeUsers, setActiveUsers] = useState([])

    const [chats, setChats] = useState([])

    useFocusEffect(
        useCallback(() => {
            const getChats = async () => {
                console.log('currentuserrrrrrrrrrrrrrrrrrrrrrrrr', currentUser)
                const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getChats`, {
                    params: { username: currentUser.username }
                })
                console.log('res for chatlists', res.data)
                setChats(res.data.chatList)
                setAllUsers(res.data.allUsers)

                setActiveUsers(res.data.activeUsers)
            }
            getChats()

            // document.addEventListener('click', (e)=>{
            //     if(usersRef && usersRef.current && !usersRef.current.contains(e.nativeEvent.target)){
            //         console.log('clicked outside')
            //     }
            // })
        }, [currentUser])
    )
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
            <View className='px-5 py-2 relative'>
                <Searchbar
                    placeholder="Search chat"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                {allUsers.length>0 && searchQuery !== '' ? <ScrollView ref={usersRef} className='absolute top-14 left-[10%] bg-white w-[90%] max-h-[400px] overflow-auto border-gray-300'
                style={{ backgroundColor: 'white', elevation: 5, zIndex:1000 }}>
                    {allUsers.filter(x => x.username.includes(searchQuery.toLocaleLowerCase()) && x.username !== currentUser.username).map((item, i)=>(
                        <Text onPress={()=>{setSearchQuery(item.username); router.push(`/messenger/${item.username}`)}} className='p-3 border-b border-gray-300' key={i}>{item.username}</Text>
                    ))}
                </ScrollView>:null}

                </View>
            <View className='pt-2 px-5 flex flex-row items-center justify-start gap-1'>
                <Text>recent chats</Text>
                <MaterialCommunityIcons name="sort-reverse-variant" size={14} color="black" /></View>
            <ScrollView>
                {chats.map((item, i) => {
                    return (
                        <Pressable onPress={() =>{
                         router.push(`/messenger/${item.participants.filter(x => x !== currentUser.username)[0]}`)
                         setSearchQuery('')}
                         } key={i} className='px-5 py-4 border-b flex flex-row items-center justify-between border-gray-300'>
                            <View className='flex flex-row gap-2 items-center'>
                                <View className='relative'>
                                    <FontAwesome name="user-circle" size={32} color="gray" />
                                    {activeUsers.some(x => x.username == item.participants.filter(x => x !== currentUser.username)[0]) ? <Octicons name="dot-fill" size={24} color="#FFA500" className='absolute bottom-[-5px] right-[-1px]' /> : null
                                    }
                                </View>
                                <View >
                                    <Text className='font-medium capitalize'>{item.participants.filter(x => x !== currentUser.username)[0]}</Text>
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