import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Octicons from '@expo/vector-icons/Octicons';

const ChatHeader = ({ title, type, active, sendMessage }) => {
    return (
        <View className={`px-5 ${type == 'chat' ? 'h-[8vh]' : 'py-4'} flex flex-row items-center gap- bg-white shadow-sm border-b border-gray-100`}>
            <TouchableOpacity onPress={() => router.back()} className="p-1">
                <Ionicons name="arrow-back" size={26} color="#1f2937" />
            </TouchableOpacity>
            
            {type == 'messenger' ? (
                <>
                    <FontAwesome6 name="facebook-messenger" size={28} color="#0084ff" />
                    <View>
                        <Text className='text-2xl ml-2 capitalize font-bold text-gray-800'>{title}</Text>
                    </View>
                </>
            ) : (
                <>
                    <View className='relative'>
                        <View className='h-10 w-10 rounded-full bg-orange-100 to-orange-600- flex items-center justify-center shadow-'>
                            <FontAwesome name="user" color="orange" size={20}/>
                        </View>
                        {active && (
                            <View className='absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white' />
                        )}
                    </View>
                    
                    <View className='flex-1 ml-2'>
                        <Text className='text-xl font-bold text-gray-800 leading-none'>{title}</Text>
                        {active ? (
                            <Text className='text-xs text-green-600 font-medium'>Active now</Text>
                        ) : (
                            <Text className='text-xs text-gray-500'>Offline</Text>
                        )}
                    </View>
                </>
            )}
            
            {type === 'chat' && (
                <TouchableOpacity 
                    // onPress={sendMessage} 
                    className='p-2 rounded-full hover:bg-gray-100'
                >
                    <SimpleLineIcons name="options-vertical" size={22} color="#6b7280" />
                </TouchableOpacity>
            )}        
        </View>
    )
}

export default ChatHeader