import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CommentsDiv from './CommentsDiv'

export default function AllComments({ commentsList, setCommentsList, blogId, scrollEnabled, setScrollEnabled }) {
    console.log('scrollenabled', scrollEnabled)
    return (
        // ${scrollEnabled ? 'h-0 p-0 overflow-hidden': 'h-[500px] '}
        <ScrollView scrollEnabled={true} className={`fixed z-20 bottom-0 w-full h-[800px] bg-white`} style={{backgroundColor:'white'}}>
            <CommentsDiv scrollEnabled={scrollEnabled} setScrollEnabled={setScrollEnabled} commentsList={commentsList} setCommentsList={setCommentsList} blogId={blogId} />
        </ScrollView>
    )
}