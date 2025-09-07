import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
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
