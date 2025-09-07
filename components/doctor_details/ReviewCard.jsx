import { Text, View } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'

export default function ReviewCard({ review }) {
    return (

        <View className="flex flex-row  bg-gray-50 gap-3 p-4 border border-gray-200 rounded-lg mb-4">


<View className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-300">
  <Text className="uppercase text-white font-semibold text-2xl">
    {review.name
      ? review.name
          .split(" ")
          .map(n => n[0])
          .slice(0, 2) // first 2 initials
          .join("")
      : ""}
  </Text>
</View>

            <View className="flex-1">
                <StarRatingDisplay
                    rating={review.rating}
                    starSize={22}

                />
                <View className="flex flex-row items-center text-lg mt-1">
                    <Text className="text-gray-900 font-semibold mt-1">
                        {review.name} • {review.time}
                    </Text>
                </View>
                <Text className=" text-gray-400 mt-1 text-wrap">{review.review}</Text>

            </View>


        </View>

    )
}