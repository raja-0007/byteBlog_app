// CommentsDiv.jsx
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import uuid from 'react-native-uuid';
import { useUserContext } from '@/hooks/useCurrentUser';

const CommentsDiv = ({ commentsList, setCommentsList, postAuthor, commentsCount, setCommentsCount, blogId, scrollEnabled, setScrollEnabled }) => {
    const [isReply, setIsReply] = useState('')
    const { currentUser } = useUserContext()
    const [comment, setComment] = useState('')
    const [isNewComment, setIsNewComment] = useState(false)
    const [viewAll, setViewAll] = useState(false)

    const submitComment = async () => {
        const commentId = uuid.v4();
        if (comment !== '') {
            const newComment = {
                commentId,
                id: blogId,
                comment,
                username: currentUser.username,
                email: currentUser.email
            }
            await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/comment`, newComment)
                .then(res => {
                    setCommentsList([...res.data.newComments, ...commentsList].slice(0, 2))
                    setCommentsCount(res.data.commentsCount)
                    setComment('')
                    setIsNewComment(false)
                })
        }
    }

    const viewAllComments = async () => {
        if (!viewAll) {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/viewallcomments/${blogId}`)
            let newComments = [...commentsList, ...response.data]
            const uniqueComments = Array.from(new Map(newComments.map(comment => [comment.commentId, comment])).values());
            setCommentsList(uniqueComments)
        } else {
            setCommentsList(commentsList?.slice(0, 2))
        }
        setViewAll(!viewAll)
    }

    return (
        <View className={`${viewAll ? 'h-[300px]' : 'h-auto'} relative`}>
            <ScrollView 
                className='px-4 py-2'
                nestedScrollEnabled
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {commentsList?.map((comment, i) => (
                    <View key={i} className='flex flex-col gap-1 my-2'>
                        <View className='flex flex-row items-start gap-2'>
                            <View className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                                <FontAwesome name="user-circle" size={14} color="#fb923c" />
                            </View>
                            <View className='flex-1'>
                                <Text className="text-gray-800">
                                    <Text className='font-bold'>{comment.username}</Text>
                                    <Text> {comment.comment}</Text>
                                </Text>
                                <View className="flex flex-row gap-4 mt-1">
                                    <TouchableOpacity onPress={() => setIsReply(isReply === i ? '' : i)}>
                                        <Text className='text-xs text-gray-600 font-medium'>Reply</Text>
                                    </TouchableOpacity>
                                    <Text className='text-xs text-gray-600'>
                                        <FontAwesome5 name="heart" size={10} color="#6b7280" /> 1
                                    </Text>
                                </View>
                            </View>
                        </View>
                        
                        {isReply === i && (
    <View className='ml-9 mt-2 flex flex-row items-center gap-2'>
        <TextInput
            multiline
            returnKeyType='send'
            placeholder={`Reply to @${comment.username}`}
            className='flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50'
            placeholderTextColor="#9ca3af"
        />
        <TouchableOpacity className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <MaterialCommunityIcons name="send" size={18} color="white" />
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
  onPress={() => setIsReply('')}
  className="px-2 py-2 active:opacity-70"
>
  <Text className="text-xs text-gray-500 font-medium underline">Cancel</Text>
</TouchableOpacity>
    </View>
)}
                    </View>
                ))}
            </ScrollView>

            <View className='px-4 pb-3 mt- border-t- border-gray-100 pt-'>
                <View className='flex flex-row gap-4 mb-3'>
                    {commentsCount !== 0 && commentsCount > 2  && (
                        <TouchableOpacity onPress={viewAllComments}>
                            <Text className="text-orange-500 font-semibold text-sm">
                                {viewAll ? 'View Less' : `View All ${commentsCount} Comments`}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {!viewAll && (
                        <TouchableOpacity onPress={() => setIsNewComment(!isNewComment)}>
                            <Text className="text-gray-600 font-semibold text-sm">
                                {!isNewComment ? 'Add Comment' : 'Cancel'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {(isNewComment || viewAll) && (
                    <View className='flex flex-row items-center gap-2'>
                        <TextInput
                            multiline
                            returnKeyType='send'
                            value={comment}
                            onChangeText={setComment}
                            placeholder='Write a comment...'
                            className='flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 bg-white'
                            placeholderTextColor="#9ca3af"
                        />
                        <TouchableOpacity 
                            onPress={submitComment}
                            className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm"
                        >
                            <MaterialCommunityIcons name="send" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default CommentsDiv