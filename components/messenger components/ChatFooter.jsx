import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ChatFooter = ({sendMessage}) => {
  const [message, setMessage] = useState('')
  const changehandler = (e)=>{
    // console.log(e.nativeEvent.text)
    setMessage(e.nativeEvent.text)
}

  const submitHandler=()=>{
    if(message !== ''){
      console.log('messagemessagemessagemessage',message)
      sendMessage(message)
      setMessage('')
    }
  }
  return (
    <View className='px-8  h-[9vh] flex flex-row items-center justify-center gap-2'>
        <TextInput multiline returnKeyType='send'
        // value={comment} onChangeText={setComment}
         placeholder={`message`} value={message} onChange={changehandler} className='border rounded-full px-5 border-gray-300 w-[90%] h-12' />
         <View className='h-12 w-12 rounded-full bg-orange-300 flex items-center justify-center'>
          <MaterialCommunityIcons name="send" className='ms-1' onPress={submitHandler} size={20} color="black" 
        // onPress={submitComment}
         /></View>
        
    </View>
  )
}

export default ChatFooter