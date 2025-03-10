import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';

const Profile = () => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const {profile} = useLocalSearchParams()

    console.log('profile[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[',profile)
    const [blogs, setBlogs] = useState([])
    const user = {
        name: 'John Doe',
        profileImage: 'https://via.placeholder.com/100',
        posts: [
            { id: '1', content: 'This is my first post!' },
            { id: '2', content: 'Loving React Native!' },
            { id: '3', content: 'Another day, another post.' },
        ],
    };


    const getPosts=async()=>{
        const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getprofile`,{
            params:{
                user:profile
            }
        
        })

        console.log('res[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[',res.data)
        setCurrentUser(res.data.profile)
            setBlogs(res.data.blogs)
    }
    useEffect(()=>{
        getPosts()
    },[profile])

    return (
        <ScrollView className="p-5 bg-gray-50 min-h-full">
            {/* Profile Section */}
            <View className="flex items-center mb-6">
                {/* <Image source={{ uri: user.profileImage }} className="w-28 h-28 rounded-full border-4 border-gray-400" /> */}
                {/* <View className="w-28 h-28 rounded-full border-4 border-gray-400"> */}
                    <FontAwesome name="user-circle" size={100} color="gray" />
                    {/* </View> */}
                <Text className="text-2xl font-bold text-gray-900 mt-3">{currentUser?.username}</Text>
                <Text className="text-gray-600 text-sm">{currentUser?.email}</Text>
            </View>

            {/* Stats Section */}
            <View className="flex-row justify-around bg-white rounded-lg shadow-md p-4 mb-6">
                
                <View className="items-center">
                    <Text className="text-lg font-bold text-gray-900">{blogs.length}</Text>
                    <Text className="text-gray-500">Posts</Text>
                </View>
                <View className="items-center">
                    <Text className="text-lg font-bold text-gray-900">{user.followers || 100}</Text>
                    <Text className="text-gray-500">Followers</Text>
                </View>
                <View className="items-center">
                    <Text className="text-lg font-bold text-gray-900">{user.following || 100}</Text>
                    <Text className="text-gray-500">Following</Text>
                </View>
            </View>

            {/* Posts Section */}
            <View className="w-full bg-white rounded-lg shadow-md p-4">
                <Text className="text-lg font-semibold text-gray-800 mb-4">Posts</Text>
                <View className="flex-row flex-wrap -m-1">
                    {blogs.map((item) => (
                        <View key={item._id} className="w-1/3 p-[1px]">
                            <Pressable onPress={()=>router.push(`/post_page/${item._id}`)}    className="bg-gray-100  rounded-lg shadow-md flex items-center justify-center h-32">
                                <Image source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${item.image}` }} className="w-full h-full " />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
