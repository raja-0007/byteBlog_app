import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ChatHeader from '@/components/messenger components/ChatHeader'
const index = () => {
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
    return (
        <SafeAreaWrapper>
            {/* <StatusBar style="auto" /> */}
            <ChatHeader title={'messenger'} type={'messenger'}/>
            {/* <View>search and chat</View> */}
            <View className='pt-2 px-5 flex flex-row items-center justify-start gap-1'>
                <Text>recent chats</Text>
                <MaterialCommunityIcons name="sort-reverse-variant" size={14} color="black" /></View>
            <ScrollView>
                {friendsList.map((item, i) => {
                    return (
                        <Pressable onPress={() => router.push(`/messenger/${item.userId}`)} key={i} className='px-5 py-4 border-b flex flex-row items-center justify-between border-gray-300'>
                            <View className='flex flex-row gap-2 items-center'>
                                <FontAwesome name="user-circle" size={32} color="gray" />
                                <View >
                                    <Text className='font-medium capitalize'>{item.username}</Text>
                                    <Text className='text-gray-500'>{item.latestMessage.commentby === 'raja' ? 'you' : item.latestMessage.commentby}: {item.latestMessage.message}</Text>
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