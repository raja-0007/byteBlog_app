
import { ClockArrowUp, UsersRound } from 'lucide-react-native'
import { Text, View } from 'react-native'

export default function  Stats() {
  return (
    <>
    <View className="flex flex-row justify-evenly p-6 gap-6">
        <View className="flex flex-col justify-center items-center">
            {/* <Text className="text-2xl font-bold">gh</Text> */}
        <View className=" p-3 rounded-xl bg-gray-200"><UsersRound color={'black'}/></View>
            <Text className="text- font-semibold text-gray-400 mt-1"><Text className="text-black font-bold">1500+</Text> Patients</Text>
            
        </View>
        <View className="flex flex-col justify-center items-center">
            {/* <Text className="text-2xl font-bold">gh</Text> */}
        <View className="p-3 rounded-xl bg-gray-200"><ClockArrowUp color={'black'}/></View>
            {/* <Text className="text- font-semibold text-gray-600 mt-1">MDS</Text> */}
            <Text className="text- font-semibold text-gray-400 mt-1"><Text className="text-black font-bold">10+</Text> Years Exp.</Text>
            
        </View>
    </View>
    </>
  )
}
