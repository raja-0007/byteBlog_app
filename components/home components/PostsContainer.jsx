import React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import PostCard from '@/components/home components/PostCard'

const PostsContainer = (postsList) => {
    // console.log(postsList)
  return (
    <SafeAreaView>
            {postsList?.postsList.map((post,i)=>{
                return (
                    <PostCard key={i} post={post} />
                )
            })}
    </SafeAreaView>
  )
}

export default PostsContainer