import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignUpProps = {
  onBackToLogin: () => void;
};

const SignUp = ({onBackToLogin }: SignUpProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'poster' | 'helper' | null>('poster');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const handleSignUp = async () => {
  if (!fullName.trim() || !email.trim() || !password.trim()) {
    Alert.alert('Missing fields', 'Please fill in all fields.');
    return;
  }
  if (!role) {
    Alert.alert('Select a role', 'Please select how you want to use DoneDash.');
    return;
  }

  setLoading(true);
  try {
    await AsyncStorage.setItem('@accountCreated', 'true'); // save signup data if needed
    Alert.alert('Account created!', 'You can now log in.', [
      {
        text: 'Log in',
        onPress: () => onBackToLogin()   // ← go to login after signup
      }
    ]);
  } catch (error) {
    Alert.alert('Sign up failed', 'Please try again.');
  } finally {
    setLoading(false);
  }
};
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: '#EAF4F6' }}
    >
      {/* Header */}
      <View
        className="flex-row items-center px-4 pt-12 pb-4"
        style={{ backgroundColor: '#EAF4F6' }}
      >
        <TouchableOpacity onPress={onBackToLogin} className="pr-4">
          <Text className="text-2xl text-black">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">Create account</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View className="items-center mt-4 mb-6">
          <View
            className="w-20 h-20 rounded-2xl items-center justify-center"
          >
            <Image
    source={require('../assets/images/donedash_logo.png')}
    style={{ width: 48, height: 48 }}
    resizeMode="contain"
  />
          </View>
        </View>

        {/* Title */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-black mb-2">
            Welcome to DoneDash
          </Text>
          <Text className="text-base text-gray-500">
            Join your campus marketplace today.
          </Text>
        </View>

        {/* Full name */}
        <Text className="text-base font-medium text-gray-800 mb-2">Full name</Text>
        <View className="rounded-2xl bg-gray-100 px-4 py-4 mb-5">
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Alex Johnson"
            autoCapitalize="words"
            className="text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* University email */}
        <Text className="text-base font-medium text-gray-800 mb-2">
          University email
        </Text>
        <View className="rounded-2xl bg-gray-100 px-4 py-4 mb-5">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="alex@university.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Password */}
        <Text className="text-base font-medium text-gray-800 mb-2">Password</Text>
        <View className="rounded-2xl bg-gray-100 px-4 py-4 mb-6 flex-row items-center">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="flex-1 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ fontSize: 20 }}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Role selector */}
        <Text className="text-base font-medium text-gray-800 mb-3">I want to...</Text>
        <View className="flex-row gap-4 mb-8">
          {/* Post jobs */}
          <TouchableOpacity
            onPress={() => setRole('poster')}
            className="flex-1 rounded-2xl items-center py-5 px-3"
            style={{
              backgroundColor: role === 'poster' ? '#fff' : '#F3F4F6',
              borderWidth: role === 'poster' ? 2 : 1,
              borderColor: role === 'poster' ? '#2D7D8F' : '#E5E7EB',
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: '#EAF4F6' }}
            >
              <Text style={{ fontSize: 22 }}>📢</Text>
            </View>
            <Text className="text-base font-bold text-gray-900 mb-1">Post jobs</Text>
            <Text className="text-xs text-gray-500 text-center">I need tasks done</Text>
          </TouchableOpacity>

          {/* Help out */}
          <TouchableOpacity
            onPress={() => setRole('helper')}
            className="flex-1 rounded-2xl items-center py-5 px-3"
            style={{
              backgroundColor: role === 'helper' ? '#fff' : '#F3F4F6',
              borderWidth: role === 'helper' ? 2 : 1,
              borderColor: role === 'helper' ? '#2D7D8F' : '#E5E7EB',
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: '#EAF4F6' }}
            >
              <Text style={{ fontSize: 22 }}>🤝</Text>
            </View>
            <Text className="text-base font-bold text-gray-900 mb-1">Help out</Text>
            <Text className="text-xs text-gray-500 text-center">
              I want to earn credits
            </Text>
          </TouchableOpacity>
        </View>

        {/* Create account button */}
        <TouchableOpacity
          onPress={handleSignUp}
          disabled={loading}
          className="rounded-2xl py-4 items-center mb-4"
          style={{ backgroundColor: '#2D7D8F' }}
        >
          <Text className="text-base font-semibold text-white">
            {loading ? 'Creating account...' : 'Create account'}
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <View className="items-center mb-6">
          <Text className="text-sm text-gray-500 text-center">
            By joining, you agree to our{' '}
            <Text className="text-[#2D7D8F] font-semibold">Terms of Service</Text>
            {' '}and{' '}
            <Text className="text-[#2D7D8F] font-semibold">Privacy Policy</Text>.
          </Text>
        </View>

        {/* Back to login */}
        <View className="items-center">
          <Text className="text-sm text-gray-500">
            Already have an account?{' '}
            <Text
              onPress={onBackToLogin}
              className="text-[#2D7D8F] font-semibold"
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;