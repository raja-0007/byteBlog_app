import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ChatFooter = ({sendMessage}) => {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const insets = useSafeAreaInsets();
  
  const changehandler = (e)=>{
    setMessage(e.nativeEvent.text)
  }

  const submitHandler = () => {
    if(message.trim() !== ''){
      console.log('messagemessagemessagemessage', message)
      sendMessage(message)
      setMessage('')
      Keyboard.dismiss()
    }
  }

  return (
<View className='px-4 py-3 flex-row items-center bg- border-t border-gray-100' 

    >
            <View className='flex flex-row items-center gap-3'>
        {/* Attachment Button */}
        <TouchableOpacity className='p-2'>
          <Ionicons name="add-circle" size={28} color="#fb923c" />
        </TouchableOpacity>

        {/* Input Container */}
        <View 
          className={`flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2 ${
            isFocused ? 'border-2 border-orange-300' : 'border-2 border-transparent'
          }`}
        >
          <TextInput 
            multiline 
            returnKeyType='send'
            placeholder="Type a message..." 
            placeholderTextColor="#9ca3af"
            value={message} 
            onChange={changehandler}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className='flex-1 text-base text-gray-800 max-h-24'
            style={{ paddingVertical: 4 }}
          />
          
          {/* Emoji Button */}
          {!message && (
            <TouchableOpacity className='ml-2'>
              <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>

        {/* Send Button */}
        <TouchableOpacity 
          onPress={submitHandler}
          disabled={!message.trim()}
          className={`h-12 w-12 rounded-full flex items-center justify-center shadow-md ${
            message.trim() ? 'bg-orange-500' : 'bg-gray-300'
          }`}
        >
          <MaterialCommunityIcons 
            name="send" 
            size={22} 
            color="white"
            style={{ marginLeft: 2 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatFooter