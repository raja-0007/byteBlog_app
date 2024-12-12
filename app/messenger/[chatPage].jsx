import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
import ChatHeader from '../../components/messenger components/ChatHeader'
import ChatFooter from '../../components/messenger components/ChatFooter'

const chatPage = () => {
    const { chatPage } = useLocalSearchParams()
    console.log('chatpage ', chatPage)
    return (
        <SafeAreaWrapper>
            <View className='flex-1 relative'>
                <ChatHeader title={chatPage} type={'chat'} />
                <ScrollView className='h-[84vh]'>
                    <Text className='py-20'>[chatPage]</Text>
                    <Text className='py-20'>[chatPage]</Text>
                    <Text className='py-20'>[chatPage]</Text>
                    <Text className='py-20'>[chatPage]</Text>
                    <Text className='py-20'>[chatPage]</Text>
                    <Text className='py-20'>[chatPage]</Text>
                </ScrollView>
                <ChatFooter />
            </View>

        </SafeAreaWrapper>

    )
}

export default chatPage