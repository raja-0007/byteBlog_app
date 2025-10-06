// PostCard.jsx
import React, { useEffect, useRef, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CommentsDiv from '@/components/post components/CommentsDiv'
import axios from 'axios';
import { router } from 'expo-router';
import { useUserContext } from '@/hooks/useCurrentUser';
import { LinearGradient } from 'expo-linear-gradient';

const PostCard = ({ post, scrollEnabled, setScrollEnabled }) => {
    const [isDescription, setIsDescription] = useState(true)
    const [commentsList, setCommentsList] = useState(post.comments)
    const [commentsCount, setCommentsCount] = useState(post.commentsCount)
    const { currentUser } = useUserContext()
    const [likes, setLikes] = useState(post.likes)
    const [liked, setLiked] = useState(post.likes.find(like => like.userId == currentUser.email))
    const [background, setBackground] = useState(true)
    const [isOverlapTitle, setIsOverlapTitle] = useState(false)

    useEffect(() => {
        setCommentsCount(post.commentsCount)
        setCommentsList(post.comments)
        setLikes(post.likes)
        setLiked(post.likes.find(like => like.userId == currentUser.email))
    }, [post])

    const handleclick = (e) => {
        setBackground(!background)
        if (!background) {
            setIsDescription(false)
            setIsOverlapTitle(false)
        } else {
            setIsOverlapTitle(true)
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

    return (
        <View className='mb- bg-white rounded- border-t border-gray-100  overflow-hidden shadow-sm mx- mt-'>
            {/* Author Header */}
            <Pressable 
                onPress={() => router.push(`/profile_page/${post.authorId}`)} 
                className='px-4 py-3 flex flex-row items-center gap-2 border-b border-gray-100'
            >
                <View className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <FontAwesome name="user-circle" size={20} color="#fb923c" />
                </View>
                <Text className="font-semibold text-gray-800">{post.username}</Text>
            </Pressable>

            {/* Image with Overlay */}
            <Pressable onPress={handleclick} className='h-[400px] w-full relative'>
                <Image 
                    source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${post.image}` }} 
                    className='w-full h-full'
                    resizeMode="cover"
                />
                {!background && isOverlapTitle && (
                    <View className='absolute z-20 bottom-4 right-4'>
                        <LinearGradient
                            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
                            className='px-4 py-2 rounded-xl'
                        >
                            <Text className='text-white font-bold text-lg uppercase'>{post.title}</Text>
                        </LinearGradient>
                    </View>
                )}
                
                {background && (
                    <View className='absolute inset-0 px-6 z-10 flex justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <View>
                            <Text className='text-center text-white font-bold text-3xl uppercase mb-3'>{post.title}</Text>
                            {/* <Pressable onPress={() => setIsDescription(!isDescription)}>
                                <Text className='text-center text-orange-400 underline font-semibold'>
                                    {isDescription ? 'Hide Description' : 'Read Description'}
                                </Text>
                            </Pressable> */}
                        </View>

                        {/* {isDescription && ( */}
                            <View className='mt-2'>
                                <Text numberOfLines={3} className='text-gray-400 text-base leading-6 mb-4'>
                                    {post?.description?.slice(0, 300)}{post?.description?.length > 300 && '...'}
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => router.push(`/post_page/${post._id}`)}
                                    className='self-end bg-orange-500 px-4 py-2 rounded-lg'
                                >
                                    <Text className='text-white font-semibold'>View Blog</Text>
                                </TouchableOpacity>
                            </View>
                        {/* )} */}
                    </View>
                )}
            </Pressable>

            {/* Interactions */}
            <View className='px-4 py-3 gap-5 flex flex-row items-center border-b- border-gray-100'>
                <TouchableOpacity 
                    onPress={() => likeHandler(liked ? 'unlike' : 'like')} 
                    className='flex flex-row items-center gap-2'
                >
                    {liked ? (
                        <FontAwesome name="heart" size={22} color="#fb923c" />
                    ) : (
                        <FontAwesome5 name="heart" size={22} color="#6b7280" />
                    )}
                    <Text className={`${liked ? 'text-orange-500' : 'text-gray-700'} font-medium`}>
                        {likes.length}
                    </Text>
                </TouchableOpacity>
                
                <View className='flex flex-row items-center gap-2'>
                    <FontAwesome5 name="comment-alt" size={20} color="#6b7280" />
                    <Text className='text-gray-700 font-medium'>{commentsCount}</Text>
                </View>
            </View>

            {/* Caption */}
            {/* {post.caption !== '' && (
                <View className='px-4 py-3 border-b border-gray-100'>
                    <Text className="text-gray-800">
                        <Text className='font-bold'>{post.username}</Text>
                        <Text> {post.caption}</Text>
                    </Text>
                </View>
            )} */}

            {/* Comments Section */}
            {commentsList.length === 0 && (
                <View className='px-4 py-'>
                    <Text className='text-sm text-gray-500'>No comments yet</Text>
                </View>
            )}
            
            <CommentsDiv
                scrollEnabled={scrollEnabled}
                postAuthor={post.username}
                setScrollEnabled={setScrollEnabled}
                commentsList={commentsList}
                setCommentsList={setCommentsList}
                setCommentsCount={setCommentsCount}
                commentsCount={commentsCount}
                blogId={post._id}
            />
        </View>
    )
}

export default PostCard