import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function AddText({postData, setPostData, submitHandler}) {

    const changehandler = (e, label)=>{
        // console.log(e.nativeEvent.text)
        setPostData({...postData, [label]:e.nativeEvent.text})
    }

  return (
    <View className="p-5 px-10 flex flex-col items-center justify-center gap-5">
      <Text className="text-center px-10 text-yellow-500 text-sm leading-3">*Enter Title, description(optional), caption(optional) and write your blog</Text>
      <TextInput value={postData.title} onChange={(e)=>changehandler(e,'title')} placeholder='Title of the Blog' className='border border-gray-300 rounded-md p-2 h-12 w-full'/>
      <TextInput multiline style={styles.texpinp} value={postData.caption} onChange={(e)=>changehandler(e,'caption')} placeholder='Give caption..' className='border border-gray-300 rounded-md p-2 h-16 w-full'/>
      <TextInput multiline style={styles.texpinp} value={postData.description} onChange={(e)=>changehandler(e,'description')} placeholder='Write a short description about your blog..' className='border border-gray-300 rounded-md p-2 h-32 w-full'/>
      <TextInput multiline style={styles.texpinp} value={postData.content} onChange={(e)=>changehandler(e,'content')} placeholder='Your Blog' className='border border-gray-300 h-[400px] rounded-md p-2 w-full'/>
      <Pressable className='self-end bg-orange-400 p-3 rounded-md px-5 ' onPress={submitHandler}><Text className='text-white font-semibold'>done</Text></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    texpinp:{
        textAlignVertical:'top'
    }
})