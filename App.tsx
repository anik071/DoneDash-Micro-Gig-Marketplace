import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import './global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

const Loading = () => (
  <View>
    <ActivityIndicator size="large" />
  </View>
);




export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnBoarding] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen,setCurrentScreen] = useState<'login' | 'signup'>('login');
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
      {/* {loading ? <Loading/>: viewedOnboarding ? <HomeScreen/> : <Onboarding/>} */}
      {loading ? <Loading/>: viewedOnboarding ?
       currentScreen === 'login' ? (
         <Login onLogin={()=> setIsLoggedIn(true)} onCreateAccount={()=> setCurrentScreen('signup')}/> 
       ) : (
         <SignUp onBackToLogin={() => setCurrentScreen('login')} />
       ) : <Onboarding/>}
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
