import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';
import { useEffect, useState } from 'react';
import "./global.css"
const Loading = () => (
  <View>
    <ActivityIndicator size="large" />
  </View>
);




export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnBoarding] = useState(false);

  const checkOnboarding = async () =>{
  try {
    const value = await AsyncStorage.getItem('@viewedOnboarding');
    if (value !== null){
      setViewedOnBoarding(true)
    }
  } catch (error) {
    console.log("Error @checkOnboarding: ", error)
  }finally{
    setLoading(false)
  }
}
useEffect(()=> {checkOnboarding()},[])
  return (
    <View style={styles.container}>
      {loading ? <Loading/>: viewedOnboarding ? <HomeScreen/> : <Onboarding/>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
