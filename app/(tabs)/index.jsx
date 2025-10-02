// app/(tabs)/index.jsx

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import HomePage from '@/components/home components/HomePage';
import { useUserContext } from '@/hooks/useCurrentUser';
import { useSocketContext } from '@/hooks/headSocket';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { currentUser, isLoading } = useUserContext();
  const { connectSocket } = useSocketContext();

  // This log is your best friend for debugging this issue.
  // Watch it in the console as the app loads.
  console.log('[HomeScreen Render] isLoading:', isLoading, 'currentUser:', !!currentUser);

  useEffect(() => {
    console.log('[HomeScreen Effect] Running effect...', { isLoading, hasUser: !!currentUser });

    // RULE #1: If we are still loading, do absolutely nothing. Don't make any decisions.
    if (isLoading) {
      console.log('[HomeScreen Effect] Still loading, waiting...');
      return; 
    }

    // RULE #2: Only after loading is finished, check for the user.
    if (!currentUser) {
      // If loading is done and there's NO user, we are logged out.
      console.log('[HomeScreen Effect] Loading finished, no user found. Redirecting to login.');
      router.replace('authentication/login'); // Use replace
    } else {
      // If loading is done and there IS a user, we are logged in.
      console.log('[HomeScreen Effect] Loading finished, user found. Connecting socket.');
      connectSocket(currentUser);
    }

    // This dependency array is CRITICAL. It tells React to re-run this logic
    // whenever 'isLoading' changes OR 'currentUser' changes.
  }, [isLoading, currentUser]);

  // While the useEffect is making its decision, show a loading screen.
  // This prevents the HomePage from trying to render with a null user.
  if (isLoading || !currentUser) {
    // We show a loader if isLoading is true OR if there's no currentUser yet.
    // This second check (!currentUser) protects against the flash of content
    // before the redirect logic in the useEffect has a chance to run.
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If we get past the check above, it means:
  // 1. isLoading is false.
  // 2. currentUser is not null.
  // It is now safe to render the main page.
  return <HomePage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});