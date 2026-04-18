import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AlertsScreen = () => {
   const clearOnboarding = async()=>{
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch (error) {
            console.log("Error @checkOnboarding: ", error)
        }
    }
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold text-slate-900">
        AlertsScreen
      </Text>
      <TouchableOpacity onPress={clearOnboarding}>
      <Text>Press this to clear onboarding</Text>  
            </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AlertsScreen
