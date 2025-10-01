// PostsContainer.jsx (Updated - Remove SafeAreaView)
import React from 'react'
import PostCard from '@/components/home components/PostCard'
import { View, Text } from 'react-native'

const PostsContainer = ({ postsList, scrollEnabled, setScrollEnabled }) => {
    if (!postsList || postsList.length === 0) {
        return (
            <View className="flex-1 justify-center items-center py-20">
                <Text className="text-gray-500 text-lg">No posts yet</Text>
                <Text className="text-gray-400 text-sm mt-2">Check back later for new content</Text>
            </View>
        )
    }

    return (
        <View className="flex-1">
            {postsList?.map((post, i) => {
                return (
                    <PostCard 
                        key={post._id || i} 
                        scrollEnabled={scrollEnabled} 
                        setScrollEnabled={setScrollEnabled} 
                        post={post} 
                    />
                )
            })}
        </View>
    )
}

export default PostsContainer