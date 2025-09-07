import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Booking from '../../components/booking_consultation/Booking';
import Profile from '../../components/doctor_details/Profile';
import Hr from '../../components/ui/Hr';

export default function Home() {
  const [selectedBookingDate, setSelectedBookingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  })
  const [selectedSlot, setSelectedSlot] = useState(null)
  return (
    <SafeAreaView className="flex-1">

      <Profile />
      <Hr />
      <Booking selectedBookingDate={selectedBookingDate} setSelectedBookingDate={setSelectedBookingDate} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View className=" p-3  bg-gray-100">
          <TouchableOpacity className="bg-red-400 p-3 w-[85%] self-center rounded-full ">
            <Text className=" font-bold text-lg text-white text-center">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}


