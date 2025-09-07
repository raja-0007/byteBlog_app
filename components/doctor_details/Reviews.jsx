import React, { useRef, useState } from "react";
import { Animated, Dimensions, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // for background fade
  const slideAnim = useRef(new Animated.Value(Dimensions.get("window").height)).current; // for modal slide

  const reviews = [
    {
      id: 1,
      name: "Omar sundaram",
      time: "9 hours ago",
      rating: 2.5,
      review:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis quam sint harum veniam repudiandae ratione consequuntur earum praesentium ",
    },
    {
      id: 2,
      name: "Omar sundaram",
      time: "19 hours ago",
      rating: 4,
      review: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis quam ",
    },
    {
      id: 3,
      name: "Omar sundaram",
      time: "20 hours ago",
      rating: 4.5,
      review:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis quam sint harum veniam repudiandae ratione consequuntur earum praesentium ",
    },
    {
      id: 3,
      name: "Omar sundaram",
      time: "20 hours ago",
      rating: 4.5,
      review:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis quam sint harum veniam repudiandae ratione consequuntur earum praesentium ",
    },
    {
      id: 3,
      name: "Omar sundaram",
      time: "20 hours ago",
      rating: 4.5,
      review:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis quam sint harum veniam repudiandae ratione consequuntur earum praesentium ",
    },
    {
      id: 3,
      name: "Omar sundaram",
      time: "20 hours ago",
      rating: 4.5,
      review:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, facilis quam sint harum veniam repudiandae ratione consequuntur earum praesentium ",
    },
  ];

  const openModal = () => {
    setShowModal(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setShowModal(false));
  };

  return (
    <SafeAreaView>
      <View className="p-6 pb-28 flex-1">
        <Text className="font-bold text-lg mb-4">Reviews</Text>

        <View>
          {reviews.slice(0, 2).map((review, i) => (
            <ReviewCard review={review} key={i} />
          ))}
        </View>

        <View className="flex-row justify-end mt-2">
          <Pressable onPress={openModal} style={{}}>
            <Text className="text-gray-700 font-semibold">Show more</Text>
          </Pressable>
        </View>
        

        {showModal && (
          <Modal transparent={true} animationType="none" visible={showModal} onRequestClose={closeModal}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                opacity: fadeAnim,
                justifyContent: "flex-end",
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: "white",
                  height: "90%",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 16,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold">All Reviews</Text>
                  <Pressable onPress={closeModal}>
                    <Text className="text-red-400 text-right font-semibold">Close</Text>
                  </Pressable>
                </View>

                <ScrollView>
                  {reviews.map((review, i) => (
                    <ReviewCard review={review} key={i} />
                  ))}
                </ScrollView>
              </Animated.View>
            </Animated.View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}
