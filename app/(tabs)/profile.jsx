import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useUserContext } from '@/hooks/useCurrentUser';
import { useSocketContext } from '@/hooks/headSocket';
import axios from 'axios';
import { router } from 'expo-router';

const Profile = () => {
    const { currentUser, setCurrentUser } = useUserContext();
    const { disconnectSocket } = useSocketContext()
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('grid'); // 'grid' or 'list'

    const getPosts = async () => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/getprofile`, {
                params: {
                    user: currentUser.email
                }
            });
            setBlogs(res.data.blogs);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        if(currentUser){

            getPosts();
        }
    }, [currentUser]);

    if (!currentUser) {
        // Optionally show a loading or redirect to login
        return (
          <View className="flex-1 items-center justify-center bg-gray-50">
            <Text className="text-gray-500">Loading...</Text>
          </View>
        );
      }

    return (
        <ScrollView className="flex-1 bg-gray-50">
            {/* Header Background */}
            <View className="h-32 bg-orange-500 relative">
                <View className="absolute inset-0 bg-orange-500 opacity-80" />
            </View>

            {/* Profile Section */}
            <View className="items-center px-5 -mt-12 mb-5">
                {/* Avatar with border */}
                <View className="mb-4">
                    <View className="w-28 h-28 rounded-full bg-white p-1 shadow-lg">
                        <View className="w-full h-full rounded-full bg-orange-500 items-center justify-center">
                            <FontAwesome name="user" size={50} color="white" />
                        </View>
                    </View>
                </View>

                {/* User Info */}
                <Text className="text-2xl font-bold text-gray-900 mb-1">{currentUser.username}</Text>
                <Text className="text-sm text-gray-600 mb-4">{currentUser.email}</Text>

                {/* Edit Profile Button */}
                <View className="flex-row items-center gap-3">
                    <Pressable className="flex-row items-center gap-2 bg-white px-5 py-2.5 rounded-full border-2 border-orange-500">
                        <MaterialIcons name="edit" size={18} color="#f97316" />
                        <Text className="text-orange-500 font-semibold text-sm">Edit Profile</Text>
                    </Pressable>
                    <Pressable
                        onPress={async() => {
                            // Perform logout logic here
                            // Example: AsyncStorage.clear(), then router.replace('/login')
                            await disconnectSocket()
                            await setCurrentUser(null);
                            router.replace('/authentication/login');
                        }}
                        className="flex-row items-center gap-2 bg-orange-500 px-5 py-2.5 rounded-full shadow-md active:opacity-80"
                    >
                        <MaterialIcons name="logout" size={18} color="white" />
                        <Text className="text-white font-semibold text-sm">Logout</Text>
                    </Pressable>
                </View>
            </View>

            {/* Stats Section */}
            <View className="flex-row bg-white rounded-2xl mx-5 p-5 mb-5 shadow-sm">
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-gray-900 mb-1">{blogs.length}</Text>
                    <Text className="text-xs text-gray-500">Posts</Text>
                </View>
                <View className="w-px bg-gray-200 mx-2" />
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-gray-900 mb-1">0</Text>
                    <Text className="text-xs text-gray-500">Followers</Text>
                </View>
                <View className="w-px bg-gray-200 mx-2" />
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-gray-900 mb-1">0</Text>
                    <Text className="text-xs text-gray-500">Following</Text>
                </View>
            </View>

            {/* Posts Section Header */}
            <View className="flex-row justify-between items-center px-5 mb-4">
                <Text className="text-xl font-bold text-gray-900">My Posts</Text>
                <View className="flex-row bg-white rounded-lg p-1 shadow-sm">
                    <Pressable
                        onPress={() => setActiveTab('grid')}
                        className={`p-2 rounded-md ${activeTab === 'grid' ? 'bg-orange-50' : ''}`}
                    >
                        <Ionicons name="grid" size={20} color={activeTab === 'grid' ? '#f97316' : '#9ca3af'} />
                    </Pressable>
                    <Pressable
                        onPress={() => setActiveTab('list')}
                        className={`p-2 rounded-md ${activeTab === 'list' ? 'bg-orange-50' : ''}`}
                    >
                        <Ionicons name="list" size={20} color={activeTab === 'list' ? '#f97316' : '#9ca3af'} />
                    </Pressable>
                </View>
            </View>

            {/* Posts Grid/List */}
            {blogs.length > 0 ? (
                <View className="px-5 pb-5">
                    {activeTab === 'grid' ? (
                        // Grid View
                        <View className="flex-row flex-wrap -mx-1">
                            {blogs.map((item) => (
                                <View key={item._id} className="w-1/3 p-1">
                                    <Pressable
                                        onPress={() => router.push(`/post_page/${item._id}`)}
                                        className="relative"
                                    >
                                        <Image
                                            source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${item.image}` }}
                                            className="w-full aspect-square rounded-lg bg-gray-200"
                                            resizeMode="cover"
                                        />
                                        <View className="absolute inset-0 bg-black/40 rounded-lg items-center justify-center opacity-0">
                                            <MaterialIcons name="article" size={24} color="white" />
                                        </View>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    ) : (
                        // List View
                        <View className="gap-3">
                            {blogs.map((item) => (
                                <Pressable
                                    key={item._id}
                                    onPress={() => router.push(`/post_page/${item._id}`)}
                                    className="flex-row bg-white rounded-xl p-3 shadow-sm"
                                >
                                    <Image
                                        source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL}/images/${item.image}` }}
                                        className="w-20 h-20 rounded-lg bg-gray-200"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1 ml-3 justify-between">
                                        <View>
                                            <Text className="text-base font-bold text-gray-900 mb-1" numberOfLines={2}>
                                                {item.title}
                                            </Text>
                                            <Text className="text-sm text-gray-600 leading-5" numberOfLines={2}>
                                                {item.description}
                                            </Text>
                                        </View>
                                        <View className="flex-row justify-between items-center mt-2">
                                            <View className="flex-row items-center gap-1">
                                                <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                                                <Text className="text-xs text-gray-400">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </Text>
                                            </View>
                                            <MaterialIcons name="arrow-forward-ios" size={16} color="#f97316" />
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>
            ) : (
                // Empty State
                <View className="items-center py-16 px-10">
                    <View className="w-32 h-32 rounded-full bg-gray-100 items-center justify-center mb-6">
                        <MaterialIcons name="post-add" size={64} color="#d1d5db" />
                    </View>
                    <Text className="text-xl font-bold text-gray-900 mb-2">No posts yet</Text>
                    <Text className="text-sm text-gray-600 text-center mb-6">
                        Start sharing your thoughts with the world!
                    </Text>
                    <Pressable
                        className="flex-row items-center gap-2 bg-orange-500 px-6 py-3.5 rounded-xl shadow-lg"
                        onPress={() => router.push('/newPost')}
                    >
                        <MaterialIcons name="add" size={24} color="white" />
                        <Text className="text-white text-base font-bold">Create Your First Post</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
};

export default Profile;