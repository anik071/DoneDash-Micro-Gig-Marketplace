import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboardingScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profileEdit/edit"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="jobDetails" options={{ headerShown: false }} />
        <Stack.Screen name="submitProposals" options={{ headerShown: false }} />
        {/*  */}
        <Stack.Screen name="completeJob" options={{ headerShown: false }} />
        <Stack.Screen name="submitReport" options={{ headerShown: false }} />
        <Stack.Screen name="leaveReview" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
};

export default RootLayout;

// const styles = StyleSheet.create({})
