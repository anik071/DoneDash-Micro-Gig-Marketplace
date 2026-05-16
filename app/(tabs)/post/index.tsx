import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { JobForm } from '../../../types/JobForm';
import FormField from '../../../components/post/FormField';
import CategoryPicker from '../../../components/post/CategoryPicker';
import DeadlinePicker from '../../../components/post/DeadlinePicker';
import PayInput from '../../../components/post/PayInput';
import ImageUploader from '../../../components/post/ImageUploader';
import { Ionicons } from '@expo/vector-icons';
const EMPTY: JobForm = {
  title: '', description: '', category: null,
  deadline: null, location: '', pay: '', images: [],
};

const inputStyle = {
  fontSize: 15, color: '#111827',
  borderBottomWidth: 1, borderBottomColor: '#e5e7eb',
  paddingVertical: 8,
};

const PostJobScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState<JobForm>(EMPTY);
  const set = (key: keyof JobForm, val: any) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const validate = () => {
    if (!form.title.trim())       { Alert.alert('Missing', 'Job title is required.'); return false; }
    if (!form.description.trim()) { Alert.alert('Missing', 'Description is required.'); return false; }
    if (!form.category)           { Alert.alert('Missing', 'Please select a category.'); return false; }
    if (!form.deadline)           { Alert.alert('Missing', 'Please set a deadline.'); return false; }
    if (!form.location.trim())    { Alert.alert('Missing', 'Location is required.'); return false; }
    if (!form.pay.trim())         { Alert.alert('Missing', 'Pay amount is required.'); return false; }
    return true;
  };

  const submit = () => {
    if (!validate()) return;
    console.log('Submitting job:', form);
    // TODO: insert into Supabase jobs table
    Alert.alert('Posted!', 'Your job has been posted successfully.');
    setForm(EMPTY);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Nav bar */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff',
        borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb',
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 15, color: '#0f6e56', fontWeight: '500' }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Post a job</Text>
        <View style={{ width: 50 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormField label="JOB TITLE" required>
            <TextInput
              style={inputStyle}
              value={form.title}
              onChangeText={t => set('title', t)}
              placeholder="e.g. Help me move dorm stuff"
              placeholderTextColor="#9ca3af"
            />
          </FormField>

          <FormField label="DESCRIPTION" required>
            <TextInput
              style={[inputStyle, { height: 100, textAlignVertical: 'top', borderBottomWidth: 0,
                borderWidth: 0, paddingVertical: 0 }]}
              value={form.description}
              onChangeText={t => set('description', t)}
              placeholder={"Describe what you need help with.\nInclude any specific tools or skills required..."}
              placeholderTextColor="#9ca3af"
              multiline
            />
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e5e7eb', marginTop: 8 }} />
          </FormField>

          <FormField label="CATEGORY" required>
            <CategoryPicker value={form.category} onChange={c => set('category', c)} />
          </FormField>

          <FormField label="DEADLINE" required>
            <DeadlinePicker value={form.deadline} onChange={d => set('deadline', d)} />
          </FormField>

          <FormField label="LOCATION" required>
            <View style={{ flexDirection: 'row', alignItems: 'center',
              borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
              <Ionicons name="location-outline" size={18} color="#0f6e56" style={{ marginRight: 6 }} />
              <TextInput
                style={[inputStyle, { flex: 1, borderBottomWidth: 0 }]}
                value={form.location}
                onChangeText={t => set('location', t)}
                placeholder="Where is this job located?"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </FormField>

          <FormField label="PAY" required>
            <PayInput value={form.pay} onChange={v => set('pay', v)} />
          </FormField>

          <FormField label="UPLOAD IMAGES">
            <ImageUploader images={form.images} onChange={imgs => set('images', imgs)} />
          </FormField>

          {/* Post button */}
          <TouchableOpacity
            onPress={submit}
            style={{
              backgroundColor: '#2d7a3a', borderRadius: 12,
              paddingVertical: 16, alignItems: 'center', marginTop: 8,
            }}
            activeOpacity={0.85}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Post job</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostJobScreen;