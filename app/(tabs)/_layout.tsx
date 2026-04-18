import { Tabs } from 'expo-router'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const BottomTabs = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed/index"
        options={{
          headerShown: false,
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post/index"
        options={{
          headerShown: false,
          title: 'Post',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="circle-with-plus" size={size} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="my-jobs/index"
        options={{
          headerShown: false,
          title: 'My Jobs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts/index"
        options={{
          headerShown: false,
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" size={size} color={color} />
          ),
        }}
      />
  
      <Tabs.Screen
        name="profile/index"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-large" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default BottomTabs
