// app/animatedPage.jsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

export default function AnimatedPage() {
  const translateY = useSharedValue(300); // start off-screen
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5); // start smaller

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 12, stiffness: 120 }); // spring bounce
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
    scale.value = withSpring(1, { damping: 12, stiffness: 120 });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>This is an animated card.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});
