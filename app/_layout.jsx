import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';
import { UserProvider } from '@/hooks/useCurrentUser'
import { SocketProvider } from '@/hooks/headSocket'


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider >
    <UserProvider>
      <SocketProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="messenger/index" options={{ headerShown: false }} />
          <Stack.Screen name="messenger/[chatPage]" options={{ headerShown: false }} />
          <Stack.Screen name="authentication/login" options={{ headerShown: false }} />
          <Stack.Screen name="authentication/register" options={{ headerShown: false }} />
          <Stack.Screen name="post_page/[postId]" options={{ title: 'Blog Overview' }} />
          <Stack.Screen name="profile_page/[profile]" options={{ title: 'Profile Page' }} />

        </Stack>
      </SocketProvider>
    </UserProvider>

    // </ThemeProvider>
  );
}
