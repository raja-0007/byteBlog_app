import { Text, View, Pressable, Image } from 'react-native';
import SafeAreaWrapper from '@/components/Layout wrappers/SafeAreaWrapper';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <SafeAreaWrapper>
      <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white justify-center items-center px-6">
        
        {/* App Header */}
        <Text className="text-3xl font-bold text-gray-800 mb-6">Welcome!</Text>
        <Text className="text-center text-gray-500 text-base mb-12">
          Choose an option below to get started.
        </Text>

        {/* Illustration / Icon */}
        {/* <Image 
          source={require('@/assets/home-illustration.png')} 
          className="w-64 h-64 mb-12" 
          resizeMode="contain"
        /> */}

        {/* Buttons */}
        <View className="w-full">
            <Pressable 
              className="bg-red-500 py-3 rounded-lg shadow-md mb-4"
              onPress={() => router.push('/home/home')}
            >
              <Text className="text-white text-center font-semibold text-lg">Go to Doctor Details</Text>
            </Pressable>

<Pressable 
              className="bg-red-500 py-3 rounded-lg shadow-md mb-4"
              onPress={() => router.push('/animatedPage')}
            >
              <Text className="text-white text-center font-semibold text-lg">Go to Animated Page</Text>
            </Pressable>

          {/* <Pressable 
            className="bg-red-100 py-3 rounded-lg border border-red-300 shadow-sm"
            onPress={() => router.push('/consultation/consultation')}
          >
            <Text className="text-red-600 text-center font-semibold text-lg">Go to Consultation</Text>
          </Pressable> */}
        </View>

      </View>
      </GestureHandlerRootView>
    </SafeAreaWrapper>
  );
}
