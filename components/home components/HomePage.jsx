import { useThemeColor } from '@/hooks/useThemeColor'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import HeaderDiv from '@/components/home components/HeaderDiv'
import PostsContainer from '@/components/home components/PostsContainer'
import uuid from 'react-native-uuid';
import axios from 'axios'
import { useFocusEffect } from "@react-navigation/native";

const HomePage = () => {
    const testList = [
        {
            post_id: '1',
            data: {
                blog_title: 'title1',
                description: 'asf l;h o; adsfh oh ;oh dsaklfhskjhfkjshfa sdfsadf  h jhklhjl h lh asd fklh kajdsfhs lksdfh kl dfhk asdfh kjl adsfh klj asdfh k llk klhlasd flkh alug dfkl  hlkjgdsf lasdf lkg klbsdf ilug ladsfjlas diflg iug ldsflkj  dshfiug adsf lkjdf liuas fildgs fliasugdiulg dlsfkj lakusdg flisdfg klsdf gsildugf sdfilsdfiu gasiuldfgasdufg lasdfu gailusdg fiudsf ladfuiag sigf sdfg sidu gfdiflsdiug fisd gfslidufg liausd fiulasgf iluas gfiluasg diugla sdfu glaidfli gigu  aksdfhu  ljlgsh dfgkljas dfiluasg flkja liufdg sialugas luigiadshf hu ;oasihef oh iuot sdlf gliug sdf'
            },
            user_id: 'user1',
            username: 'username1',
            img: 'redux',
            caption: 'caption1',
            likes: ['user2', 'user1'],
            comments: [
                {
                    user_id: 'user2',
                    username: 'username2',
                    comment: 'comment1 by user2'
                }
            ]
        },
        {
            post_id: '2',
            data: {
                blog_title: 'title2',
                description: 'asf l;h o; adsfh oh ;oh dsaklfhskjhfkjshfa sdfsadf  h jhklhjl h lh asd fklh kajdsfhs lksdfh kl dfhk asdfh kjl adsfh klj asdfh k llk klhlasd flkh alug dfkl  hlkjgdsf lasdf lkg klbsdf ilug ladsfjlas diflg iug ldsflkj  dshfiug adsf lkjdf liuas fildgs fliasugdiulg dlsfkj lakusdg flisdfg klsdf gsildugf sdfilsdfiu gasiuldfgasdufg lasdfu gailusdg fiudsf ladfuiag sigf sdfg sidu gfdiflsdiug fisd gfslidufg liausd fiulasgf iluas gfiluasg diugla sdfu glaidfli gigu  aksdfhu  ljlgsh dfgkljas dfiluasg flkja liufdg sialugas luigiadshf hu ;oasihef oh iuot sdlf gliug sdf'
            },
            user_id: 'user2',
            username: 'username2',
            img: 'sockets',
            caption: 'caption2',
            likes: ['user2', 'user3'],
            comments: [
                {
                    user_id: 'user3',
                    username: 'username3',
                    comment: 'comment1 by user3'
                }
            ]
        },
        {
            post_id: '3',
            data: {
                blog_title: 'title3',
                description: 'asf l;h o; adsfh oh ;oh dsaklfhskjhfkjshfa sdfsadf  h jhklhjl h lh asd fklh kajdsfhs lksdfh kl dfhk asdfh kjl adsfh klj asdfh k llk klhlasd flkh alug dfkl  hlkjgdsf lasdf lkg klbsdf ilug ladsfjlas diflg iug ldsflkj  dshfiug adsf lkjdf liuas fildgs fliasugdiulg dlsfkj lakusdg flisdfg klsdf gsildugf sdfilsdfiu gasiuldfgasdufg lasdfu gailusdg fiudsf ladfuiag sigf sdfg sidu gfdiflsdiug fisd gfslidufg liausd fiulasgf iluas gfiluasg diugla sdfu glaidfli gigu  aksdfhu  ljlgsh dfgkljas dfiluasg flkja liufdg sialugas luigiadshf hu ;oasihef oh iuot sdlf gliug sdf'
            },
            user_id: 'user3',
            username: 'username3',
            img: 'mirotalk',
            caption: 'caption3',
            likes: ['user2', 'user1'],
            comments: [
                {
                    user_id: 'user2',
                    username: 'username2',
                    comment: 'comment1 by user2'
                },
                {
                    user_id: 'user1',
                    username: 'username1',
                    comment: 'comment1 by user1'
                },
            ]
        },
    ]
    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    //   setPostsList((prevPostList) => [
    //     {
    //         post_id: uuid.v4(),
    //         data: {
    //             blog_title: 'title5',
    //             description: 'Long description...',
    //         },
    //         user_id: 'user3',
    //         username: 'username3',
    //         img: 'sockets',
    //         caption: 'caption3',
    //         likes: ['user2', 'user3'],
    //         comments: [{ user_id: 'user1', username: 'username1', comment: 'comment1 by user1' }],
    //     },...prevPostList
        
    // ])
    getBlogs()
    }, 2000);
  }, []);
    const [postsList, setPostsList] = useState([])
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isScrollEnabled, setIsScrollEnabled] = useState(true)
    const debounceTimer = useRef(null);
    const scrollViewRef = useRef(null)
    const [scrollEnabled, setScrollEnabled] = useState(true)

    const getBlogs=async()=>{
        // console.log('calling')
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/home`)
        // console.log('home page blogs>> ',response.data)
        setPostsList(response.data)
    }

    // console.log('postslistsss', postsList)
    useFocusEffect(
        useCallback(() => {
          getBlogs(); // Runs when the tab is focused
    
          return () => {
            console.log("Tab Unfocused"); // Optional cleanup
          };
        }, []))
    const handleScroll = ({ contentOffset, contentSize, layoutMeasurement }) => {
        //   const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 10; // Add a small offset for precision
        if (isBottom && !isAtBottom && isScrollEnabled) {
            setIsAtBottom(true);
            setIsScrollEnabled(false)
            console.log('Reached bottom');
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current); // Clear any existing debounce
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
            }, 2000); // 2 seconds delay for loading new data
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



    // console.log('scrolll ', isScrollEnabled)

    return (
        <SafeAreaView>
            <ScrollView scrollEnabled={scrollEnabled}
                refreshControl = {
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                className='relative'
                ref={scrollViewRef} onScroll={(event) => { event.persist(); handlescrollbottom(event) }} scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 20 }} >
                <HeaderDiv />
                <PostsContainer scrollEnabled={scrollEnabled} setScrollEnabled={setScrollEnabled} postsList={postsList} />
                {isAtBottom && <View>
                    <Text className='p-5 text-center'>loading...</Text>
                </View>}
            </ScrollView>
        </SafeAreaView>

    )
}

import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import About from '../../components/doctor_details/About';
import Book from '../../components/doctor_details/Book';
import Hospital from '../../components/doctor_details/Hospital';
import Profile from '../../components/doctor_details/Profile';
import Reviews from '../../components/doctor_details/Reviews';
import Stats from '../../components/doctor_details/Stats';
import Hr from '../../components/ui/Hr';

function LogoTitle() {
  return (
    <View><Text className="text-white">Doctor Details</Text></View>

  );
}

function BackButton() {

  const router = useRouter()
  return (
    <Pressable onPress={() => router.back()}>
      <Text>Back</Text>
    </Pressable>
  )
}

export default function Home() {
  return (
    <SafeAreaView className="flex-1">

      <ScrollView className="relative bg-white" keyboardShouldPersistTaps="handled">
        {/* <Stack.Screen
        options={{
        //   headerLeft: () => <BackButton/>,
          headerTitle: props => <LogoTitle {...props} />,
        //   headerRight: () => <Button onPress={() => setCount(c => c + 1)} title="Update count" />,
        }}
      /> */}
        <Profile />
        <Hr />
        <Stats />
        <Hr />
        <About />
        <Hr />
        <Hospital />
        <Hr />
        <Reviews />

      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} pointerEvents="box-none">
    <Book /> 
  </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
})


// export default HomePage