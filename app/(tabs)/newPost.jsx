import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AddImage from '@/components/new post components/AddImage'
import AddText from '@/components/new post components/AddText'
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios'
import { useUserContext } from '@/hooks/useCurrentUser'
import { router, useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function newPost() {
  const {currentUser} = useUserContext()

  const [active, setActive] = useState('images')
  const [image, setImage] = useState(null)
  const [postData, setPostData] = useState({
    title:'',
    description:'',
    content:''
  })

  const submitHandler = async()=>{
    console.log(postData)
    const formdata = new FormData()
    formdata.append('image',{
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg',
    })
    formdata.append('title',postData.title)
    formdata.append('description',postData.description)
    formdata.append('content',postData.content)
    formdata.append('authorId', currentUser.email)
    formdata.append('username', currentUser.username)
    
    await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/create`, formdata,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res=>{
      console.log('res', res.data)
      router.push('/')
      setPostData({
        title:'',
        description:'',
        content:''
      })
      setImage(null)
    })
    .catch(err=>{
      console.log(err)
      setPostData({
        title:'',
        description:'',
        content:''
      })
      setImage(null)
    })
  }

  useFocusEffect(
    // The useFocusEffect callback requires useCallback to prevent infinite re-renders
    React.useCallback(() => {
      // Reset all relevant state variables here
      setPostData({
        title: '',
        description: '',
        content: ''
      })
      setImage(null)
      setActive('images') // Optional: reset back to the 'images' tab
      
      // The return function is an optional cleanup function that runs when the screen is unfocused
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>

    <ScrollView  className="bg-gray-50">
      <View className="flex flex-row bg-white shadow-sm border-b border-gray-200">
        <Pressable 
          onPress={() => setActive('images')} 
          className={`w-[50%] flex flex-row justify-center items-center py-4 ${active === 'images' ? 'border-b-2 border-orange-500' : ''}`}
        >
          <Entypo name="image-inverted" size={24} color={active === 'images' ? '#f97316' : '#9ca3af'} />
          <Text className={`ml-2 font-medium ${active === 'images' ? 'text-orange-500' : 'text-gray-400'}`}>
            Image
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => setActive('text')} 
          className={`w-[50%] border-l border-gray-200 flex flex-row justify-center items-center py-4 ${active === 'text' ? 'border-b-2 border-orange-500' : ''}`}
        >
          <Entypo name="text" size={24} color={active === 'text' ? '#f97316' : '#9ca3af'} />
          <Text className={`ml-2 font-medium ${active === 'text' ? 'text-orange-500' : 'text-gray-400'}`}>
            Content
          </Text>
        </Pressable>
      </View>
      <View className='h-full flex-1'>
      
        {active === 'images' ? 
          <AddImage image={image} setImage={setImage} setActive={setActive} /> : 
          <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // extraScrollHeight={Platform.OS === 'ios' ? 90 : 0}
        // style={{ flex: 1 }}
      >

        <AddText submitHandler={submitHandler} postData={postData} setPostData={setPostData} />
      </KeyboardAvoidingView>
        }
        
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}