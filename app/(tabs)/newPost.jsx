import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AddImage from '@/components/new post components/AddImage'
import AddText from '@/components/new post components/AddText'
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios'


export default function newPost() {
  const authorId = 'raja@gmail.com'
  const username = 'raja'
  const [active, setActive] = useState('images')
  const [image, setImage] = useState(null)
  const [postData, setPostData] = useState({
    title:'',
    caption:'',
    description:'',
    content:''
  })

  const submitHandler = async()=>{
    console.log(postData)
    const formdata = new FormData()
    formdata.append('image',{
      uri: image, // Use the image URI directly
      type: 'image/jpeg', // Set the MIME type
      name: 'image.jpg', // Specify a filename
  })
    formdata.append('title',postData.title)
    formdata.append('caption',postData.caption)
    formdata.append('description',postData.description)
    formdata.append('content',postData.content)
    // console.log(postData)
    // Object.keys(postData).forEach(element => {
    //   formdata.append(`${element}`,formdata[element])
    // });

    formdata.append('authorId', authorId)
    formdata.append('username', username)
    // console.log('calling', formdata)
    await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/create`, formdata,{
      headers: {
        'Content-Type': 'multipart/form-data',
    },
    })
    .then(res=>console.log('res', res.data))
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex flex-row p-5">
        <Pressable onPress={() => setActive('images')} className="w-[50%] flex flex-row justify-center">
          <Entypo name="image-inverted" size={24} color={active === 'images' ? '#656363' : 'silver'} />
        </Pressable>
        <Pressable onPress={() => setActive('text')} className="w-[50%] border-l border-gray-300 flex flex-row justify-center">
          <Entypo name="text" size={24} color={active === 'text' ? '#656363' : 'silver'} />
        </Pressable>
      </View>
      <View className='h-full flex-1'>{active === 'images' ? <AddImage image={image} setImage={setImage} /> : <AddText submitHandler={submitHandler} postData={postData} setPostData={setPostData} />}</View>
      
    </ScrollView>
  )
}