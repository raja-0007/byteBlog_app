import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { FontAwesome, FontAwesome5, FontAwesome6, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useUserContext } from '@/hooks/useCurrentUser';
import CommentsDiv from '@/components/post_page_components/PostComments'
import { SafeAreaView } from 'react-native-safe-area-context'

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
        <SafeAreaView edges={['top']} className="flex-1 bg-gray-50">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header with Back Button */}
                <View className="flex-row items-center justify-between px-5 py-4 bg-white">
                    <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-gray-100">
                        <Ionicons name="arrow-back" size={24} color="#1f2937" />
                    </Pressable>
                    <View className="flex-row items-center gap-2">
                        <Pressable className="p-2 rounded-full bg-gray-100">
                            <MaterialIcons name="bookmark-outline" size={24} color="#1f2937" />
                        </Pressable>
                        <Pressable className="p-2 rounded-full bg-gray-100">
                            <MaterialIcons name="share" size={24} color="#1f2937" />
                        </Pressable>
                    </View>
                </View>

                {/* Hero Image */}
                <View className="relative">
                    <Image
                        source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${blog?.image}` }}
                        className="w-full h-80"
                        style={{ resizeMode: "cover" }}
                    />
                    <View className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </View>

                {/* Content Container */}
                <View className="bg-white -mt-6 rounded-t-3xl px-5 pt-6">
                    {/* Title */}
                    <View className="mb-6">
                        <View className="flex-row items-center mb-3">
                            <View className="w-1 h-8 bg-orange-500 rounded-full mr-3" />
                            <Text className="text-3xl font-bold text-gray-900 flex-1 leading-tight">
                                {blog?.title}
                            </Text>
                        </View>
                    </View>

                    {/* Author Info */}
                    <Pressable 
                        onPress={() => router.push(`/(tabs)/profile`)} 
                        className="flex-row items-center bg-gray-50 rounded-xl p-4 mb-6"
                    >
                        <View className="w-12 h-12 rounded-full bg-orange-500 items-center justify-center mr-3">
                            <FontAwesome name="user" size={20} color="white" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-xs text-gray-500 mb-1">Written by</Text>
                            <Text className="text-base font-bold text-gray-900 capitalize">
                                {blog?.username}
                            </Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={18} color="#9ca3af" />
                    </Pressable>

                    {/* Description Section */}
                    <View className="mb-6">
                        <View className="flex-row items-center mb-3">
                            <MaterialIcons name="description" size={20} color="#f97316" />
                            <Text className="font-bold text-lg text-gray-900 ml-2">Introduction</Text>
                        </View>
                        <Text className="text-gray-700 text-base leading-7 bg-orange-50 p-4 rounded-xl border-l-4 border-orange-500">
                            {blog?.description}
                        </Text>
                    </View>

                    {/* Content Section */}
                    <View className="mb-6">
                        <View className="flex-row items-center mb-3">
                            <MaterialIcons name="article" size={20} color="#f97316" />
                            <Text className="font-bold text-lg text-gray-900 ml-2">Full Story</Text>
                        </View>
                        <Text className="text-gray-700 text-base leading-7">
                            {blog?.content}
                        </Text>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-200 my-6" />

                    {/* Like & Comment Section */}
                    <View className="flex-row items-center justify-around bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                        {/* Like Button */}
                        <Pressable
                            className="flex-1 flex-row items-center justify-center gap-2 py-3"
                            onPress={() => likeHandler(liked ? 'unlike' : 'like')}
                        >
                            {liked ? (
                                <FontAwesome name="heart" size={24} color="#f97316" />
                            ) : (
                                <FontAwesome5 name="heart" size={24} color="#9ca3af" />
                            )}
                            <Text className={`font-semibold ${liked ? 'text-orange-500' : 'text-gray-600'}`}>
                                {likes?.length}
                            </Text>
                        </Pressable>

                        <View className="w-px h-8 bg-gray-200" />

                        {/* Comment Button */}
                        <Pressable className="flex-1 flex-row items-center justify-center gap-2 py-3">
                            <FontAwesome5 name="comment-alt" size={24} color="#9ca3af" />
                            <Text className="text-gray-600 font-semibold">{commentsCount}</Text>
                        </Pressable>

                        <View className="w-px h-8 bg-gray-200" />

                        {/* Share Button */}
                        <Pressable className="flex-1 flex-row items-center justify-center gap-2 py-3">
                            <MaterialIcons name="share" size={24} color="#9ca3af" />
                            <Text className="text-gray-600 font-semibold">Share</Text>
                        </Pressable>
                    </View>

                    {/* Comments Section Header */}
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <MaterialIcons name="forum" size={22} color="#f97316" />
                            <Text className="font-bold text-lg text-gray-900 ml-2">
                                Comments ({commentsCount})
                            </Text>
                        </View>
                    </View>

                    {/* Comments Section */}
                    <View className="mb-6">
                        <CommentsDiv
                            postAuthor={blog?.username}
                            commentsList={commentsList}
                            setCommentsList={setCommentsList}
                            blogId={blog?._id}
                            commentsCount={commentsCount}
                            setCommentsCount={setCommentsCount}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostPage