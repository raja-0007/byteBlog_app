import React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import PostCard from '@/components/home components/PostCard'

const PostsContainer = ({postsList, scrollEnabled, setScrollEnabled}) => {
    // console.log(postsList)
  return (
    <SafeAreaView>
            {postsList?.map((post,i)=>{
                return (
                    <PostCard key={i} scrollEnabled={scrollEnabled} setScrollEnabled={setScrollEnabled} post={post} />
                )
            })}
    </SafeAreaView>
  )
}

export default PostsContainer