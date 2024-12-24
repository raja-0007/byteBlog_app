import { Image, StyleSheet, Platform, Text, View, SafeAreaView, StatusBar } from 'react-native';
import HomePage from '@/components/home components/HomePage'
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper'
import { useUserContext } from '@/hooks/useCurrentUser';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
export default function HomeScreen() {
  // console.log('staus ar', parseInt(StatusBar.currentHeight))
  const {currentUser} = useUserContext()
  const [isMounted, setIsMounted] = useState(false);

  // Wait for the component to mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (isMounted && !currentUser) {
      router.push('authentication/login');
    }
  }, [currentUser, isMounted]);

  if (!isMounted || !currentUser) return null;
  return (
    // <SafeAreaView style={styles.container} className={`pt-[${parseInt(StatusBar.currentHeight)}]`}>
      <SafeAreaWrapper>
        <HomePage />
      </SafeAreaWrapper>
    // </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: parseInt(StatusBar.currentHeight)
  },

});
