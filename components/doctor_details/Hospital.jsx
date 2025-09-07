import { ChevronRight, HospitalIcon } from 'lucide-react-native'
import { Text, View } from 'react-native'

export default function Hospital() {
    return (

        <View className=" p-6">
            <Text className=" font-bold text-lg">Hospital</Text>
            <View className="flex flex-row items-center  gap-3 mt-3">
                <View className="p-2 w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-400">
                    <HospitalIcon color={"#9ca3af"} />
                </View>
                <View className="flex-1 flex-row justify-between items-center gap-6">
                    <View className="">
                        <Text className=" text-gray-500 font-semibold mt-1">Apollo Hospital</Text>
                        <Text className=" text-gray-400 mt-1">Jubilee Hills, Hyderabad, Telangana</Text>

                    </View>
                    <ChevronRight color={"#9ca3af"} />
                </View>
            </View>
        </View>

    )
}