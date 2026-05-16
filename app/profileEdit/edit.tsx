import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import EditableField from '../../components/profile/EditableField';

// Default values — in production, pull from auth/Supabase context
const DEFAULTS = {
  avatar: 'https://i.pravatar.cc/150?img=12',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  phone: '+880 1711 234567',
  address: 'Hall 3, Room 214, University Campus, Dhaka',
  university: 'BUET',
  studentId: '2019-2-60-014',
  bio: 'Reliable campus helper. Fast, friendly, and always on time.',
};

const EditProfileScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState(DEFAULTS);

  const set = (key: keyof typeof DEFAULTS) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Nav bar */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-1"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={20} color="#0f6e56" />
          <Text className="text-base font-medium text-teal-700">Back</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-gray-900">Edit Profile</Text>
        <View className="w-16" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >

        {/* Avatar */}
        <EditableField
          label="Profile Photo"
          value={form.avatar}
          fieldType="avatar"
          onSave={set('avatar')}
        />

        {/* Section: Personal */}
        <Text className="text-xs font-bold text-gray-400 tracking-widest mt-6 mb-1">
          PERSONAL INFO
        </Text>

        <EditableField label="Full Name"   value={form.name}      onSave={set('name')} />
        <EditableField label="Email"       value={form.email}     fieldType="email"   onSave={set('email')} />
        <EditableField label="Phone"       value={form.phone}     fieldType="phone"   onSave={set('phone')} />
        <EditableField label="Address"     value={form.address}   fieldType="address" onSave={set('address')} />

        {/* Section: Academic */}
        <Text className="text-xs font-bold text-gray-400 tracking-widest mt-6 mb-1">
          ACADEMIC INFO
        </Text>

        <EditableField label="University"  value={form.university} onSave={set('university')} />
        <EditableField label="Student ID"  value={form.studentId}  onSave={set('studentId')} />

        {/* Section: About */}
        <Text className="text-xs font-bold text-gray-400 tracking-widest mt-6 mb-1">
          ABOUT
        </Text>

        <EditableField label="Bio" value={form.bio} fieldType="address" onSave={set('bio')} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;