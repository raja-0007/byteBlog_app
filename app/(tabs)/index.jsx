// app/(tabs)/index.jsx (or your HomeScreen file)
import { Image, StyleSheet, Platform, Text, View, StatusBar } from 'react-native';
import HomePage from '@/components/home components/HomePage'
import { useUserContext } from '@/hooks/useCurrentUser';
import { useSocketContext } from '@/hooks/headSocket';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { currentUser } = useUserContext()
  const { connectSocket } = useSocketContext()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !currentUser) {
      console.log('mountedddddddddd', currentUser, isMounted)
      router.push('authentication/login');
    } else if (isMounted && currentUser) {
      console.log('calling to connect')
      connectSocket(currentUser)
    }
  }, [currentUser, isMounted]);

  if (!isMounted || !currentUser) return null;

  return <HomePage />;
}