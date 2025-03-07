import { View, Text, SafeAreaView, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import { useUserContext } from '@/hooks/useCurrentUser';
import CommentsDiv from '@/components/post_page_components/PostComments'

const PostPage = () => {
    const { postId } = useLocalSearchParams()
    const [blog, setBlog] = useState(null)
    const { currentUser } = useUserContext()
    const [commentsList, setCommentsList] = useState(null)
    const [likes, setLikes] = useState(null)
    const [liked, setLiked] = useState(null)
    const [commentsCount, setCommentsCount] = useState(null)

    const getPostById = async () => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getPostById`, {
                params: {
                    postId: postId
                }
            })

            // console.log('responseeeeeeeeeee', res.data, res.data.image)
            setBlog(res.data)
            setLiked(res.data.likes.find(like => like.userId == currentUser.email))
            setLikes(res.data.likes)
            setCommentsList(res.data.comments)
            setCommentsCount(res.data.commentsCount)
        }
        catch (err) {
            console.log('err in getting post')
        }
    }

    const likeHandler = async (action) => {
        await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/like`, { id: blog._id, userId: currentUser.email, action })
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
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Blog Title */}
                <View className="flex-row items-center py-4 px-5">
                    <View className="p-2 rounded-full bg-gray-100 text-orange-500">
                        <FontAwesome6 name="feather" size={14} color="#f97316" />
                    </View>
                    <Text className="font-bold text-xl text-gray-800 ml-2">
                        {blog?.title}
                    </Text>
                </View>

                {/* Blog Image */}
                <Image
                    source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${blog?.image}` }}
                    className="w-full h-[400px] rounded-lg"
                    style={{ resizeMode: "cover" }}
                />

                {/* Blog Description */}
                <View className="p-5">
                    <Text className="font-bold text-lg text-gray-900">Description</Text>
                    <Text className="text-gray-600 text-base leading-relaxed">{blog?.description}</Text>
                </View>

                {/* Blog Content */}
                <View className="p-5">
                    <Text className="font-bold text-lg text-gray-900">Content</Text>
                    <Text className="text-gray-600 text-base leading-relaxed">{blog?.content}</Text>
                </View>

                {/* Like & Comment Section */}
                <View className="px-5 py-4 flex flex-row items-center justify-between border-t border-gray-300">
                    {/* Like Button */}
                    <Pressable
                        className="flex flex-row items-center gap-2"
                        onPress={() => likeHandler(liked ? 'unlike' : 'like')}
                    >
                        {liked ?
                            <FontAwesome name="heart" size={22} color="#fb923c" /> :
                            <FontAwesome5 name="heart" size={22} color="black" />}
                        <Text className="text-gray-800 font-medium">{likes?.length} Likes</Text>
                    </Pressable>

                    {/* Comment Button */}
                    <Pressable className="flex flex-row items-center gap-2">
                        <FontAwesome5 name="comment-alt" size={22} color="black" />
                        <Text className="text-gray-800 font-medium">{commentsCount} Comments</Text>
                    </Pressable>
                </View>

                {/* Comments Section */}
                <View className="p-2">
                    <CommentsDiv
                        postAuthor={blog?.username}
                        commentsList={commentsList}
                        setCommentsList={setCommentsList}
                        blogId={blog?._id}
                        commentsCount={commentsCount}
                        setCommentsCount={setCommentsCount}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default PostPage