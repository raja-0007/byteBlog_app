import { useCallback, useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Slots from './Slots';

export default function Booking({ selectedBookingDate, setSelectedBookingDate, selectedSlot, setSelectedSlot }) {
    

    const generateDateObjects = useCallback((startDate, numberOfDays) => {
        const result = [];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let currentDate = new Date(startDate);

        for (let i = 0; i < numberOfDays; i++) {
            // Format date as YYYY-MM-DD
            const formattedDate = currentDate.toISOString().split("T")[0];

            result.push({
                date: formattedDate, // "2025-09-06"
                day: days[currentDate.getDay()],
                month: months[currentDate.getMonth()],
                year: currentDate.getFullYear(),
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return result;
    }, [])

    const dates = useMemo(() => {
        const today = new Date();
        // setSelectedBookingDate(today.toISOString().split("T")[0])
        return generateDateObjects(today, 10);
    }, []);
    // console.log(dates);

    const slots = {
        morning: [
            "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM",
            "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
            "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
            "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
            "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
            "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM"
        ],
        evening: [
            "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
            "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
            "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
            "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
            "07:00 PM", "07:15 PM", "07:30 PM", "07:45 PM",
            "08:00 PM", "08:15 PM", "08:30 PM", "08:45 PM"
        ]
    }

    return (

        <SafeAreaView
            className="flex-1 py-6">
            


                <Text className="px-6 font-bold text-lg mb-3">Booking Date</Text>
                <View className="h-max">
  <ScrollView
    horizontal
    nestedScrollEnabled
    keyboardShouldPersistTaps="always"
    showsHorizontalScrollIndicator={false}
  >
    {dates.map((date, index) => {
      return (
        <Pressable
          key={index}
          onPress={() => setSelectedBookingDate(date.date)}
          className={`py-2 h-max w-14 border mr-3 rounded-lg 
            ${date.date === selectedBookingDate ? 'bg-red-100 border-red-300' : 'bg-white border-gray-300'} 
            ${index === 0 ? 'ml-6' : ''}`}
        >
          <Text className="uppercase text-center text-sm">
            {date.day ? date.day.slice(0, 3) : ""}
          </Text>
          <Text className="uppercase text-center text-base">
            {date.date.split("-")[2] ?? ""}
          </Text>
          <Text className="uppercase text-center text-base">
            {date.month ? date.month.slice(0, 3) : ""}
          </Text>
        </Pressable>
      );
    })}
  </ScrollView>
</View>
                <View className="px-6 flex-1 pt-3">
                <ScrollView className="flex-1" nestedScrollEnabled // <-- important for vertical scroll with inner horizontal
                showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

            <Slots slots={slots.morning} setSelectedSlot={setSelectedSlot} selectedSlot={selectedSlot} title="Morning Slots" />
            <Slots slots={slots.evening} setSelectedSlot={setSelectedSlot} selectedSlot={selectedSlot} title="Evening Slots" />
</ScrollView>
</View> 
        </SafeAreaView>

    )
}