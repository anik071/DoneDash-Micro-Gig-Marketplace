import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  label: string;
  value: string;
  fieldType?: 'text' | 'email' | 'phone' | 'address' | 'avatar';
  onSave: (val: string) => void;
};

const EditableField = ({ label, value, fieldType = 'text', onSave }: Props) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);


  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setDraft(uri);
      onSave(uri);
    }
  };

  // Avatar field — special treatment
  if (fieldType === 'avatar') {
    return (
      <View className="py-4 border-b border-gray-100">
        <Text className="text-xs font-semibold text-gray-400 tracking-widest mb-3">
          {label.toUpperCase()}
        </Text>
        <View className="flex-row items-center justify-between">
          <Image
            source={{ uri: value }}
            className="w-16 h-16 rounded-full"
          />
          <TouchableOpacity
            onPress={pickImage}
            className="flex-row items-center gap-1 px-4 py-2 rounded-xl bg-teal-50"
          >
            <Ionicons name="camera-outline" size={16} color="#0f6e56" />
            <Text className="text-sm font-medium text-teal-700">Change photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="py-4 border-b border-gray-100">
      <Text className="text-xs font-semibold text-gray-400 tracking-widest mb-1">
        {label.toUpperCase()}
      </Text>

      {!editing ? (
        // View mode
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-base text-gray-800 flex-1 mr-4">{value || '—'}</Text>
          <TouchableOpacity
            onPress={() => { setDraft(value); setEditing(true); }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text className="text-sm font-medium text-teal-700">Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Edit mode
        <View className="mt-2">
          <TextInput
            value={draft}
            onChangeText={setDraft}
            autoFocus
            keyboardType={
              fieldType === 'email' ? 'email-address'
              : fieldType === 'phone' ? 'phone-pad'
              : 'default'
            }
            multiline={fieldType === 'address'}
            numberOfLines={fieldType === 'address' ? 3 : 1}
            className={`bg-gray-50 border border-teal-300 rounded-xl px-4 py-3 text-base text-gray-800 ${
              fieldType === 'address' ? 'h-20 text-top' : ''
            }`}
          />
          <View className="flex-row gap-3 mt-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 items-center"
            >
              <Text className="text-sm font-medium text-gray-500">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 py-2.5 rounded-xl bg-teal-700 items-center"
            >
              <Text className="text-sm font-medium text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default EditableField;