import { View, Text, SafeAreaView, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useUserContext } from '@/hooks/useCurrentUser';
import CommentsDiv from '@/components/post components/CommentsDiv'

const PostPage = () => {
    const { postId } = useLocalSearchParams()
    const [blog, setBlog] = useState(null)
    const { currentUser } = useUserContext()
    const [commentsList, setCommentsList] = useState(null)
    const [likes, setLikes] = useState(null)
    const [liked, setLiked] = useState(null)

    const getPostById = async () => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getPostById`, {
                params: {
                    postId: postId
                }
            })

            console.log('responseeeeeeeeeee', res.data, res.data.image)
            setBlog(res.data)
            setLiked(res.data.likes.find(like => like.userId == currentUser.email))
            setLikes(res.data.likes)
            setCommentsList(res.data.comments)
        }
        catch (err) {
            console.log('err in getting post')
        }
    }

    const likeHandler = async (action) => {
        await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/like`, { id: post._id, userId: currentUser.email, action })
            .then((res) => {
                if (res.data.status == 'done') {
                    setLiked(!liked)
                    setLikes(res.data.likes)
                }
            })
    }

    useEffect(() => {
        getPostById()
    }, [postId])



    return (
        <SafeAreaView>
            <ScrollView>
                <Text className='py-3 font-semibold text-lg px-5'>{blog?.title}</Text>
                <Image source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${blog?.image}` }} className='w-full h-[400px] object-contain' />
                <View className='p-4'>
                    <Text className=' font-semibold text-lg'>Description</Text>
                    <Text>{blog?.description}</Text>
                </View>
                <View className='p-4'>
                    <Text className=' font-semibold text-lg'>Content</Text>
                    <Text>{blog?.content}</Text>
                </View>

                <View className=' px-5 py-3 gap-5 flex flex-row items-center'>
                    <View className='flex flex-row items-center gap-1'>
                        {liked ? <FontAwesome name="heart" size={20} color="#fb923c" onPress={() => likeHandler('unlike')} /> : <FontAwesome5 name="heart" size={20} color="black" onPress={() => likeHandler('like')} />}
                        <Text>{likes?.length} likes</Text>
                    </View>
                    <Pressable className='flex flex-row items-center gap-2'>
                        <FontAwesome5 name="comment-alt" size={20} color="black" />
                        <Text>{blog?.comments?.length} comments</Text>

                    </Pressable>
                </View>
                <CommentsDiv
                    postAuthor={blog?.username}
                    commentsList={commentsList}
                    setCommentsList={setCommentsList} blogId={blog?._id} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostPage