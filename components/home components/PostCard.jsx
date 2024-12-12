import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import socketsLogo from '@/assets/images/socketsLogo.png'
import mirotalkLogo from '@/assets/images/mirotalkLogo.png'
import reduxLogo from '@/assets/images/redux.png'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CommentsDiv from '@/components/post components/CommentsDiv'
import AllComments from '@/components/post components/AllComments'
import axios from 'axios';
const PostCard = ({ post, scrollEnabled, setScrollEnabled }) => {
    const [isDescription, setIsDescription] = useState(false)
    const [commentsList, setCommentsList] = useState(post.comments)
    const currentUser = '123334343'
    const [likes, setLikes] = useState(post.likes)
    const [liked, setLiked] = useState(post.likes.find(like=>like.userId==currentUser))
    const titleRef = useRef(null)
    const [background, setBackground] = useState(true)
    const images = {
        redux: reduxLogo,
        sockets: socketsLogo,
        mirotalk: mirotalkLogo
    }
    const [isOverlapTitle, setIsOverlapTitle] = useState(false)

    let timeInterval;
    useEffect(() => {
        const toggleImage = (e) => {
            console.log('toggled')
            if (titleRef && titleRef.current && !titleRef.current.contains(e.target)) {
                console.log('toggled 22')
            }
        }
    }, [])

    const handleclick = (e) => {
        setBackground(!background)
        if (!background) {
            setIsDescription(false)
            setIsOverlapTitle(false)
            // return ()=>{
            //     clearInterval(timeInterval)
            // }

        }
        else if (background) {
            setIsOverlapTitle(true)
            // timeInterval = setInterval(() => {
            //     setIsOverlapTitle(!isOverlapTitle)
            // }, 2000);

        }

    }

    const likeHandler = async(action)=>{
        await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/like`, {id:post._id, userId:currentUser, action})
        .then((res)=>{
            if(res.data.status == 'done'){
                 setLiked(!liked)
                 setLikes(res.data.likes)
                }
        })
    }
    return (
        <View>
            <View className='p-5 border-y-2 border-gray-300 flex flex-row items-center gap-1 '>
                <FontAwesome name="user-circle" size={20} color="black" />
                <Text>{post.username}</Text></View>
            <TouchableOpacity onPress={handleclick} className='h-[400px] w-full relative flex items-center justify-center'>
                <Image source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${post.image}` }} className='w-full h-full' />
                {!background && isOverlapTitle && <View className='absolute z-20 bottom-3 right-3'>
                    <Text className=' text-center text-white bg-slate-500 rounded-md px-2 font-bold text-xl uppercase'>{post.title}</Text>
                </View>}
                <View className='absolute w-full px-10 z-10 h-full flex justify-center flex-col' style={{ backgroundColor: background ? 'rgba(0, 0, 0, 0.6)' : 'transparent' }}>
                    {background &&
                        <>
                            <View ref={titleRef} >
                                <Text className=' text-center text-white font-bold text-3xl uppercase'>{post.title}</Text>
                                <Pressable onPress={() => setIsDescription(!isDescription)}>
                                    <Text className='text-center text-orange-400 underline-offset-2 underline'>{isDescription ? 'hide description' : 'read description'}</Text>
                                </Pressable>
                            </View>

                            {isDescription && <View className='flex flex-col mt-10 gap-3 items-end justify-end w-full'>
                                <Text className='text-white text-xl leading-5 '>{post.description}</Text>
                                <Text className='text-end self-end w-[max-content] bg-slate-500 p-1 px-2 rounded-md text-white'>view blog</Text>
                            </View>}
                        </>}

                </View>
            </TouchableOpacity>
            <View className=' px-5 py-3 gap-5 flex flex-row items-center'>
                <View className='flex flex-row items-center gap-1'>
                    {liked ? <FontAwesome name="heart" size={20} color="#fb923c" onPress={()=>likeHandler('unlike')}/> : <FontAwesome5 name="heart" size={20} color="black" onPress={()=>likeHandler('like')} />}
                    <Text>{likes.length} likes</Text>
                </View>
                <Pressable className='flex flex-row items-center gap-2'>
                    <FontAwesome5 name="comment-alt" size={20} color="black" />
                    <Text>{post.comments.length} comments</Text>

                </Pressable>
            </View>
            {post.caption !== '' && <View className='px-5 pb-2'>
                <Text><Text className='font-semibold'>{post.username}</Text> {post.caption}</Text>
            </View>}
            {/* {isComments &&  */}
            {/* {scrollEnabled ?  */}
            {commentsList.length !== 0 ? 
            <CommentsDiv 
            scrollEnabled={scrollEnabled} postAuthor={post.username} 
            setScrollEnabled={setScrollEnabled} commentsList={commentsList}
             setCommentsList={setCommentsList} blogId={post._id} />
             :(
                <View className='px-5 pb-3 '>
                  <Text className='text-[12px] text-gray-600'>no comments yet</Text>
                </View>
              )
}            
{/* :<AllComments scrollEnabled={scrollEnabled} setScrollEnabled={setScrollEnabled} commentsList={commentsList} setCommentsList={setCommentsList} blogId={post._id} />
              } */}
        </View>
    )
}

const styles = StyleSheet.create({
    titleDiv: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }

})

export default PostCard