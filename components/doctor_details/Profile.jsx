
import { Image } from 'expo-image'
import { Star } from 'lucide-react-native'
import { Text, View } from 'react-native'

export default function  Profile() {
  return (
    <>
    <View className="flex flex-row p-6 gap-6">
        <View className="w-24 h-24 rounded-3xl bg-red-400 overflow-hidden">
        <Image
        source={require("../../assets/images/doctor.jpg")}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}        contentFit="cover"
        transition={1000}
      />
        </View>
        <View >
            <Text className="text-2xl font-bold">Dr. Vijay Sawanth</Text>
            <Text className="text- font-semibold text-gray-600 mt-1">MDS. FDS - General Physician</Text>
            <View className="flex flex-row justify-between items-center mt-3 text-md">
                <View className="p-2 rounded-2xl bg-red-200">
                    <Text className="flex flex-row items-center "><Text className="mr-">4.5</Text> <Star size={15} color={'black'} /></Text>
                </View>
                <View>
                    <Text className="flex flex-row gap-2 items-center">Fees: <Text className="text-red-400 flex flex-row items-center">
                        ₹1500</Text></Text>
                </View>
            </View>
        </View>
    </View>
    </>
  )
}
