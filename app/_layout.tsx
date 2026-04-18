import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const RootLayout = () => {
  return (
    <SafeAreaProvider>
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='onboardingScreen' options={{headerShown: false}}/>
      <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
    </Stack>
 </SafeAreaProvider>
  )
}

export default RootLayout

// const styles = StyleSheet.create({})