import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import uuid from 'react-native-uuid';
const CommentsDiv = ({ commentsList, setCommentsList, postAuthor, blogId, scrollEnabled, setScrollEnabled }) => {
    const [isReply, setIsReply] = useState('')
    const name = '1234567890'
    const [comment, setComment] = useState('')
    const [isNewComment, setIsNewComment] = useState(false)
    const [viewAll, setViewAll] = useState(false)

    // console.log('commentss>>>>>>>>>>>>>>> ', blogId)
    const submitComment = async () => {
        // console.log(' ', comment)
        const commentId = uuid.v4();
        if (comment !== '') {
            // console.log('calling', comment)
            const newComment = {
                commentId,
                id: blogId,
                comment,
                username: 'raja',
                email: 'raja@gmail.com'
            }
            await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/comment`, newComment)
                .then(res => {
                    // console.log('comment res>>', res.data)
                    setCommentsList(res.data.newComments)
                    setComment('')
                    setIsNewComment(false)
                })
        }
    }

    const viewAllComments = async () => {
        if (!viewAll) {
            // console.log('calling commentss')
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/viewallcomments/${blogId}`)
            // console.log(response.data)
            setCommentsList([...commentsList, ...response.data])
        }
        else {
            setCommentsList(commentsList.slice(0, 2))
        }
        setViewAll(!viewAll)
        // setScrollEnabled(!scrollEnabled)
    }

    return (
        <View className={`${viewAll ? ' h-[300px]' : 'h-auto'} relative px-5 pb-3`}><ScrollView className={`w-full   pt-0 flex flex-col  gap-5 `}
            nestedScrollEnabled
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {/* <View className={`${viewAll ? 'pb-14':''}`}> */}
            {commentsList?.map((comment, i) => {
                return (
                    <View key={i} className='flex flex-col gap-0 my-1'>
                        <View className='flex w-full relative flex-row items-center'>
                            <FontAwesome name="user-circle" size={16} color="gray" />
                            <Text className='ms-[2px]'><Text className='font-semibold'>{comment.username}</Text> {comment.comment}</Text>
                            {postAuthor === 'raja' && <View className="absolute right-0 flex flex-row gap-2 items-center">
                                {/* <Text onPress={() => { isReply === '' ? setIsReply(i) : setIsReply('') }} className='text-[12px] text-gray-700'>reply</Text> */}
                                <FontAwesome5 name="heart" size={13} color="black" />
                            </View>}
                        </View>
                        <View className="flex flex-row gap-5 mx-5 items-center">
                            <Text onPress={() => { isReply === '' ? setIsReply(i) : setIsReply('') }} className='text-[12px] text-gray-700'>reply</Text>
                            <Text className='text-[12px] text-gray-700'><FontAwesome5 name="heart" size={10} color="black" />1 like</Text>
                        </View>
                        {(isReply == i && isReply !== '') && <View className='px-3 mt-2 flex flex-row items-center justify-center  gap-3'>
                            {/* <Text>reply: @{name.slice(0,20)}</Text> */}
                            <TextInput multiline returnKeyType='send' placeholder={`reply @${comment.username}`} className='border rounded-md border-gray-300 w-[90%] h-12' />
                            <MaterialCommunityIcons name="send" size={24} color="black" />
                        </View>}
                    </View>

                )
            })}
            {/* </View> */}





        </ScrollView>
            <View className={`${viewAll ? '' : ''} w-full mt-2`}>
                <View className='flex w-full px-3 flex-row gap-4 justify-start'>
                    <Pressable onPress={viewAllComments}><Text>{viewAll ? 'view less' : 'view all'}</Text></Pressable>
                    {!viewAll && <Pressable onPress={() => { setIsNewComment(!isNewComment) }}><Text>{!isNewComment ? 'add comment' : 'cancel'}</Text></Pressable>}
                </View>

                {(isNewComment || viewAll) && <View className={` flex  flex-col gap-0 mt-3`}>
                    <View className='px-3 flex flex-row items-center justify-center  gap-3'>
                        <TextInput multiline returnKeyType='send' value={comment} onChangeText={setComment} placeholder={`comment...`} className='border rounded-md border-gray-300 w-[90%] h-12' />
                        <MaterialCommunityIcons name="send" size={24} color="black" onPress={submitComment} />
                    </View>
                </View>}
            </View>
        </View>


    )
}

export default CommentsDiv