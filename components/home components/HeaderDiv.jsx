// HeaderDiv.jsx
import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useUserContext } from '@/hooks/useCurrentUser';
import { useSocketContext } from '@/hooks/headSocket';
import { LinearGradient } from 'expo-linear-gradient';

const HeaderDiv = () => {
    const { currentUser, activeUsers, setActiveUsers, unread, setUnread } = useUserContext()
    const { ws, socketID, connectSocket } = useSocketContext()

    useEffect(() => {
        if (ws) {
            ws.on('new_message', (data) => {
                console.log('Message from server:', data)
            });
        } else {
            console.log('socket not connected')
        }

        return () => {
            if (ws) {
                ws.off('new_message');
            }
        };
    }, []);

    return (
        <View className='bg-white shadow-sm'>
            <LinearGradient
                colors={['#ffffff', '#ffffff']}
                // colors={['#ffffff', '#fff7ed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className='px-6 py-4 flex flex-row items-center justify-between'
            >
                <View className='flex flex-row items-center gap-2'>
                    <View className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <FontAwesome5 name="feather" size={20} color="#fb923c" />
                    </View>
                    <Text className='text-2xl font-bold text-gray-800'>ByteBlog</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={() => router.push('/messenger')}
                    className='relative'
                    activeOpacity={0.7}
                >
                    {Object.keys(unread).length !== 0 && (
                        <View className="absolute top-[-8px] right-[-8px] z-50 flex items-center justify-center min-w-[20px] h-5 rounded-full bg-orange-500 px-1 shadow-md">
                            <Text className="text-white text-xs font-bold">{Object.keys(unread)?.length}</Text>
                        </View>
                    )}
                    <View className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                        <FontAwesome6 name="facebook-messenger" size={20} color="#fb923c" />
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default HeaderDiv