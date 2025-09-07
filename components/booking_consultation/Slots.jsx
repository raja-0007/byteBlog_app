import { Pressable, SafeAreaView, Text, View } from 'react-native';

export default function Slots({slots, selectedSlot, setSelectedSlot, title}) {

    
    return (

        <SafeAreaView
         className=" mb-3">
            <Text className=" font-bold text-lg mb-3">{title} <Text className="text-gray-400 font-normal text-base">({slots.length})</Text></Text>
            
            <View
         className="flex flex-row justify- flex-wrap gap-3">
                {slots.length > 0 ? slots.map((slot, index)=>{
                    return(
                        <Pressable onPress={() => setSelectedSlot(slot)} className={`py-3 w-1/6 border rounded-xl ${slot == selectedSlot ? 'bg-red-100 border-red-300':'bg-white border-gray-300'}`} key={index}>
                            <Text className="uppercase text-center">{ slot.split(" ")[0] ?? ""}</Text>
                           
                            </Pressable>
                    )
                })
                :<Text className="font-semibold text-gray-400">
                    No Slots Available
                </Text>

            }
                
            </View>
        </SafeAreaView>

    )
}