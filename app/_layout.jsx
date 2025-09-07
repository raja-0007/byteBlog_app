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
        <StatusBar style="dark" />
        <Stack
        screenOptions={{
          animation: 'slide_from_right', // Customize this! fade, from_left, etc.
          // You can also use gestureDirection, header options, etc.
          gestureDirection: 'horizontal',         // ← or 'vertical', 'vertical-inverted', etc.
    gestureEnabled: true,
    headerStyle: { backgroundColor: '#6200EE' }, // header background
          headerTintColor: '#fff', // title & back button color
          headerTitleAlign: 'center', // center title
          contentStyle: { backgroundColor: 'white' }
        }}

        
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="messenger/index" options={{ headerShown: false, gestureEnabled: true,
    gestureDirection: 'horizontal',
    animation: 'slide_from_right',
 }} />
 <Stack.Screen name="index" options={{ headerShown: false }} /> 
        <Stack.Screen name="home/home" 
        options={{
          title: 'Doctor Details',
          headerStyle: { backgroundColor: '#fecaca' },
    headerTintColor: '',
    // headerBackImage: ({ tintColor }) => (
    //   <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
    //     <Ionicons name="arrow-back" size={24} color={tintColor} />
    //     <Text style={{ color: tintColor, fontWeight: 'bold', marginLeft: 4 }}>Back</Text>
    //   </TouchableOpacity>
    // ),
        }}
         />
        <Stack.Screen name="consultation/consultation" 
        options={{
          title: 'Doctor Consultation',
          headerStyle: { backgroundColor: '#fecaca' },
    headerTintColor: '',
    
        }}
         />
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
