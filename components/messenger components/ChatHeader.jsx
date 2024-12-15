import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const ChatHeader = ({ title, type, sendMessage }) => {
    return (
        <View className={`px-5 ${type == 'chat' ? 'h-[7vh]' : 'py-4'} flex flex-row items-center gap-3 border-b-2 border-gray-300`} >
            {type == 'messenger' ? <FontAwesome6 onPress={() => router.back()} name="facebook-messenger" size={24} color="black" />
                : <FontAwesome name="user-circle" size={24} color="black" />

            }
            {/* <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color="black" /> */}
            {type == 'messenger' ? <View>
                <Text className='text-2xl'>{title}</Text>

            </View> :
                <View>
                    <Text className='text-2xl'>{title}</Text>

                </View>
            }
            {type === 'chat' && (<View className='absolute right-5'><SimpleLineIcons name="options-vertical" size={24} onPress={sendMessage} color="black" /></View>) 
            
            }        
            </View>
    )
}

export default ChatHeader