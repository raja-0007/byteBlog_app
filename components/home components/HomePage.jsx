// HomePage.jsx (Updated)
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RefreshControl, ScrollView, Text, View, ActivityIndicator, StatusBar } from 'react-native'
import HeaderDiv from '@/components/home components/HeaderDiv'
import PostsContainer from '@/components/home components/PostsContainer'
import uuid from 'react-native-uuid';
import axios from 'axios'
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [postsList, setPostsList] = useState([])
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isScrollEnabled, setIsScrollEnabled] = useState(true)
    const debounceTimer = useRef(null);
    const scrollViewRef = useRef(null)
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getBlogs()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const getBlogs = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/home`)
            setPostsList(response.data)
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getBlogs();
            return () => {
                console.log("Tab Unfocused");
            };
        }, [])
    )

    const handleScroll = ({ contentOffset, contentSize, layoutMeasurement }) => {
        const isBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;
        if (isBottom && !isAtBottom && isScrollEnabled) {
            setIsAtBottom(true);
            setIsScrollEnabled(false)
            console.log('Reached bottom');
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }

            debounceTimer.current = setTimeout(() => {
                setPostsList((prevPostList) => [
                    ...prevPostList,
                    {
                        post_id: uuid.v4(),
                        data: {
                            blog_title: 'title1',
                            description: 'Long description...',
                        },
                        user_id: 'user1',
                        username: 'username1',
                        img: 'redux',
                        caption: 'caption1',
                        likes: ['user2', 'user3'],
                        comments: [{ user_id: 'user3', username: 'username3', comment: 'comment1 by user3' }],
                    },
                ]);

                setIsAtBottom(false);
                setIsScrollEnabled(true);
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ y: contentOffset.y + 300, animated: true });
                }
            }, 2000);
        }
    };

    const debounce = (func, delay) => {
        return (...args) => {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => func(...args), delay);
        };
    };

    const handlescrollbottom = useCallback(debounce((event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        handleScroll({ contentOffset, contentSize, layoutMeasurement });
    }, 500), []);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white" edges={['top']}>
                <ActivityIndicator size="large" color="#fb923c" />
                <Text className="mt-4 text-gray-600">Loading posts...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <HeaderDiv />
            <ScrollView 
                scrollEnabled={scrollEnabled}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fb923c']} />
                }
                ref={scrollViewRef} 
                onScroll={(event) => { event.persist(); handlescrollbottom(event) }} 
                scrollEventThrottle={16} 
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <PostsContainer scrollEnabled={scrollEnabled} setScrollEnabled={setScrollEnabled} postsList={postsList} />
                {isAtBottom && (
                    <View className="py-6 flex-row justify-center items-center">
                        <ActivityIndicator size="small" color="#fb923c" />
                        <Text className='ml-2 text-gray-600'>Loading more posts...</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomePage