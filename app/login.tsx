import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Login required', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await AsyncStorage.setItem('@isLoggedIn', 'true');
        router.replace('/(tabs)/feed');
    } catch (error) {
      Alert.alert('Login failed', 'Unable to complete login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: '#EAF4F6' }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        
        {/* Top brand name */}
        <View className="items-center pt-14 pb-6">
          <Text className="text-2xl font-bold text-[#348293]">DoneDash</Text>
        </View>

        {/* Title */}
        <View className="items-center px-6 mb-6">
          <Text className="text-4xl font-bold text-black mb-2 text-center">Welcome back</Text>
          <Text className="text-base text-gray-500">Sign in to manage your campus gigs</Text>
        </View>

        {/* Card */}
        <View
          className="mx-4 rounded-2xl bg-white px-6 py-8"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 }}
        >
          {/* Email */}
          <Text className="text-xs font-semibold text-gray-500 mb-2 tracking-widest uppercase">
            Email
          </Text>
          <View className="rounded-xl bg-gray-100 px-4 py-3 mb-5">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="name@university.edu"
              keyboardType="email-address"
              autoCapitalize="none"
              className="text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Password row */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
              Password
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-[#348293]">Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View className="rounded-xl bg-gray-100 px-4 py-3 mb-6">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              className="text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Login button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className="rounded-2xl py-4 items-center mb-6"
            style={{ backgroundColor: '#2D7D8F' }}
          >
            <Text className="text-base font-semibold text-white">
              {loading ? 'Signing in...' : 'Log in'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-3 text-xs text-gray-400 uppercase tracking-widest">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-200 bg-white py-3 gap-2"
            >
              {/* Google G icon placeholder */}
              <Text style={{ fontSize: 16 }}>G</Text>
              <Text className="text-sm font-medium text-gray-700">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-200 bg-white py-3 gap-2"
            >
              <Text style={{ fontSize: 14 }}>iOS</Text>
              <Text className="text-sm font-medium text-gray-700">Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign up link */}
        <View className="items-center mt-8 px-6">
          <Text className="text-sm text-gray-500">
            New to the campus marketplace?{' '}
            <Text onPress={() => router.push('/signup')} className="text-[#4CAF50] font-semibold">Create an account</Text>
          </Text>
        </View>

        {/* Footer */}
        <View className="items-center mt-auto py-8">
          <Text className="text-xs text-gray-400 uppercase tracking-widest">
            DoneDash © 2024 • Editorial gigs for students
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;