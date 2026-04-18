import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Index = () => {
  const [loading, setLoading] = useState(true);

  const checkFlow = async () => {
    try {
     const hasSeenOnboarding = await AsyncStorage.getItem('@viewedOnboarding');
    const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');

    if (!hasSeenOnboarding) {
      router.replace('/onboardingScreen');
    } else if (!isLoggedIn) {
      router.replace('/login'); // 👈 go to auth
    } else {
      router.replace('/(tabs)/feed'); // 👈 go to app
    }


    } catch (error) {
      console.log("Error @checkFlow : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFlow ();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});