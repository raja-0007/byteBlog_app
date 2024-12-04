import React from 'react'
import { Text, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
const HeaderDiv = () => {
  return (
    <View className='bg-gray-200 p-5 flex flex-row items-center justify-between'>
        <View className='flex flex-row items-center'>
            <FontAwesome5 name="feather" size={24} color="black" />
        <Text className='text-xl'>ByteBlog</Text>
        </View>
        <AntDesign name="wechat" size={24} color="black" />
        
    </View>
  )
}

export default HeaderDiv