import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const HomeScreen = () => {
    const clearOnboarding = async()=>{
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch (error) {
            console.log("Error @checkOnboarding: ", error)
        }
    }
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-gray-900">
        This is HomeScreen
      </Text>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear onBoarding</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
