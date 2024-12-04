import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context'

const CommentsDiv = ({ comments }) => {
    const [isReply, setIsReply] = useState('')
    const name  = '1234567890'
    return (
        <ScrollView className=" w-full px-5 pt-3 pb-5 flex flex-col gap-5">
            {comments.map((comment, i) => {
                return (
                    <View key={i} className='flex flex-col gap-0'>
                        <View className='flex w-full relative flex-row items-center my-1'>
                            <FontAwesome name="user-circle" size={16} color="gray" />
                            <Text className='ms-[2px]'><Text className='font-semibold'>{comment.username}</Text> {comment.comment}</Text>
                            <View className="absolute right-0 flex flex-row gap-2 items-center">
                                <Text onPress={() => {isReply === '' ?setIsReply(i):setIsReply('')}} className='text-[12px] text-gray-700'>reply</Text>
                                <FontAwesome5 name="heart" size={13} color="black" /></View>
                        </View>
                        {(isReply == i && isReply !== '') && <View className='px-3 mb-3 flex flex-row items-center justify-center  gap-3'>
                            {/* <Text>reply: @{name.slice(0,20)}</Text> */}
                            <TextInput multiline returnKeyType='send' placeholder={`reply @${comment.username}`} className='border rounded-md border-gray-300 w-[90%] h-12' />
                            <MaterialCommunityIcons name="send" size={24} color="black" />
                        </View>}
                    </View>

                )
            })}

        </ScrollView>

    )
}

export default CommentsDiv