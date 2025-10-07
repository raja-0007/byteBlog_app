// HomePage.jsx (Updated)
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RefreshControl, ScrollView, Text, View, ActivityIndicator, StatusBar } from 'react-native'
import HeaderDiv from '@/components/home components/HeaderDiv'
import PostsContainer from '@/components/home components/PostsContainer'
import uuid from 'react-native-uuid';
import axios from 'axios'
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Platform } from 'react-native';

const HomePage = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [postsList, setPostsList] = useState([])
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isScrollEnabled, setIsScrollEnabled] = useState(true)
    const debounceTimer = useRef(null);
    const scrollViewRef = useRef(null)
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(null)
    const [page, setPage] = useState(1)

    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        setPage(1)
        setIsAtBottom(false)
        setIsScrollEnabled(true)
        await getBlogs()
        // setTimeout(() => {
            setRefreshing(false);
        // }, 2000);
    }, [page]);

    const getBlogs = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/home`, {
                params:{
                    page:1,
                    limit:2
                }
            })
            setPostsList(response.data.data)
            setTotalPages(response.data.totalPages)
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

    const fetchPostsDebounce = async (pageNumber = 1) => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/home?page=${pageNumber}&limit=2`);
            setTotalPages(res.data.totalPages)
            return res.data.data || [];
        } catch (err) {
            console.error('Error fetching posts:', err.message);
            return [];
        }
    };

    // 🧩 Scroll Handler
    const handleScroll = async ({ contentOffset, contentSize, layoutMeasurement }) => {
        const isBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;
        console.log("conditionsssssss", isBottom , isAtBottom , isScrollEnabled)
        if (isBottom && !isAtBottom && isScrollEnabled) {
            setIsAtBottom(true);
            setIsScrollEnabled(false);
            console.log('Reached bottom, fetching next page...', page, totalPages);

            if(page !== totalPages){

                const nextPage = page + 1;
                const newPosts = await fetchPostsDebounce(nextPage);
    
                if (newPosts.length > 0) {
                    setPostsList((prev) => [...prev, ...newPosts]);
                    setPage(nextPage);
                }
    
                setIsAtBottom(false);
                setIsScrollEnabled(true);
    
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ y: contentOffset.y + 200, animated: true });
                }
            }
        }
    };

    // ⏱ Debounce helper
    const debounce = (func, delay) => {
        return (...args) => {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => func(...args), delay);
        };
    };

    const handleScrollBottom = useCallback(
        debounce((event) => {
            const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
            handleScroll({ contentOffset, contentSize, layoutMeasurement });
        }, 500),
        [page, postsList]
    );

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
                onScroll={(event) => { 
                    if (Platform.OS !== 'web') event.persist();
                    handleScrollBottom(event)
                 }} 
                scrollEventThrottle={16} 
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <PostsContainer scrollEnabled={scrollEnabled} setScrollEnabled={setScrollEnabled} postsList={postsList} />
                {isAtBottom && (
                    <View className="py-6 flex-row justify-center items-center">
                        {page !== totalPages ? <>
                        <ActivityIndicator size="small" color="#fb923c" />
                        <Text className='ml-2 text-gray-600'>Loading more posts...</Text>
                        </>:
                            <Text className='ml-2 text-gray-600'>You've reached the end!</Text>

                        }
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomePage