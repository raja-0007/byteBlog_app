import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'orange',   // active tab color
        tabBarInactiveTintColor: '#888',   // inactive tab color
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          color: '#000',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          title: 'New',
          tabBarIcon: ({ color, size }) => <Octicons name="diff-added" size={size} color={color} />,
          headerTitle: 'New Post',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle" size={size} color={color} />,
          headerTitle: 'Profile',
        }}
      />
    </Tabs>
  );
}
