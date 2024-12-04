import { useThemeColor } from '@/hooks/useThemeColor'
import React, { useCallback, useRef, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import HeaderDiv from '@/components/home components/HeaderDiv'
import PostsContainer from '@/components/home components/PostsContainer'
import uuid from 'react-native-uuid';
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
      setPostsList((prevPostList) => [
        {
            post_id: uuid.v4(),
            data: {
                blog_title: 'title5',
                description: 'Long description...',
            },
            user_id: 'user3',
            username: 'username3',
            img: 'sockets',
            caption: 'caption3',
            likes: ['user2', 'user3'],
            comments: [{ user_id: 'user1', username: 'username1', comment: 'comment1 by user1' }],
        },...prevPostList
        
    ])
    }, 2000);
  }, []);
    const [postsList, setPostsList] = useState(testList)
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [isScrollEnabled, setIsScrollEnabled] = useState(true)
    const debounceTimer = useRef(null);
    const scrollViewRef = useRef(null)
    const handleScroll = ({ contentOffset, contentSize, layoutMeasurement }) => {
        //   const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 10; // Add a small offset for precision
        console.log('valueeeee ', isScrollEnabled, isAtBottom, isBottom)
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


    console.log('scrolll ', isScrollEnabled)

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl = {
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ref={scrollViewRef} onScroll={(event) => { event.persist(); handlescrollbottom(event) }} scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 10 }} >
                <HeaderDiv />
                <PostsContainer postsList={postsList} />
                {isAtBottom && <View>
                    <Text className='p-5 text-center'>loading...</Text>
                </View>}
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomePage