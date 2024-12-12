import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    
     >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          headerShown:false
          // headerTitle:'byteBLog'
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          title: 'new',
          tabBarIcon: ({ color }) => <Octicons name="diff-added" size={24} color={color} />,
          // headerShown:false
          headerTitle:'new post'
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle" size={24} color={color} />,
          // headerShown:false
          headerTitle:'profile'
        }}
      />
      
    </Tabs>
  );
}
