
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function  Book() {
  const router = useRouter()
  return (
   
    <View className=" p-3  bg-gray-100">
    <Pressable onPress={() =>{ router.push('/consultation/consultation')}} className="bg-red-400 z-50 p-3 w-[85%] self-center rounded-full ">
        <Text className=" font-bold text-lg text-white text-center">Book Appointment</Text>
    </Pressable>
    </View>
   
  )
}
