import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import EditableField from "../../components/profile/EditableField";
import { useEditProfile } from "../../hooks/useEditProfile";
import LoadingScreen from "../../components/common/LoadingScreen";

const EditProfileScreen = () => {
  const router = useRouter();

  const {
    form,
    loading,
    saving,
    errors,
    globalError,
    updateField,
    saveProfile,
  } = useEditProfile();

  const scrollRef = useRef<ScrollView>(null);
  const positions = useRef({
    personal: 0,
    academic: 0,
    communication: 0,
    bio: 0,
  });

  const handleSave = async () => {
    const result = await saveProfile();

    if (result.success) {
      router.back();
      return;
    }

    if (result.section === "personal") {
      scrollRef.current?.scrollTo({
        y: positions.current.personal,
        animated: true,
      });
    }

    if (result.section === "communication") {
      scrollRef.current?.scrollTo({
        y: positions.current.communication,
        animated: true,
      });
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-1"
        >
          <Ionicons name="chevron-back" size={20} color="#0f6e56" />
          <Text className="text-base font-medium text-teal-700">Back</Text>
        </TouchableOpacity>

        <Text className="text-base font-semibold text-gray-900">
          Edit Profile
        </Text>

        <TouchableOpacity disabled={saving} onPress={handleSave}>
          <Text className="text-base font-semibold text-teal-700">
            {saving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        {globalError ? (
          <View className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5">
            <Text className="text-red-600 text-center">{globalError}</Text>
          </View>
        ) : null}

        {/* Avatar */}
        <EditableField
          label="Profile Photo"
          value={form.avatar}
          fieldType="avatar"
          onSave={(image) => updateField("avatar", image)}
        />

        {/* Personal */}
        <View
          onLayout={(event) => {
            positions.current.personal = event.nativeEvent.layout.y;
          }}
        >
          <Text className="text-xs font-bold text-gray-400 tracking-widest mt-6 mb-1">
            PERSONAL
          </Text>

          <EditableField
            label="First Name"
            value={form.first_name}
            onSave={(v) => updateField("first_name", v)}
          />

          {errors.first_name ? (
            <Text className="text-red-500 text-sm mt-1 mb-3">
              {errors.first_name}
            </Text>
          ) : null}

          <EditableField
            label="Last Name"
            value={form.last_name}
            onSave={(v) => updateField("last_name", v)}
          />

          {errors.last_name ? (
            <Text className="text-red-500 text-sm mt-1 mb-3">
              {errors.last_name}
            </Text>
          ) : null}

          <EditableField label="Email" value={form.email} editable={false} />

          <EditableField
            label="Location"
            value={form.location}
            fieldType="address"
            onSave={(v) => updateField("location", v)}
          />
        </View>

        {/* Academic */}
        <View
          onLayout={(event) => {
            positions.current.academic = event.nativeEvent.layout.y;
          }}
        >
          <Text className="text-xs font-bold text-gray-400 tracking-widest mt-6 mb-1">
            ACADEMIC
          </Text>

          <EditableField
            label="University"
            value={form.university}
            onSave={(v) => updateField("university", v)}
          />

          <EditableField
            label="Department"
            value={form.department}
            onSave={(v) => updateField("department", v)}
          />
        </View>

        {/* Communication */}
        <View
          onLayout={(event) => {
            positions.current.communication = event.nativeEvent.layout.y;
          }}
        >
          <Text className="text-xs font-bold text-gray-400 tracking-widest mt-6 mb-1">
            COMMUNICATION (AT LEAST ONE REQUIRED)
          </Text>
          <EditableField
            label="WhatsApp"
            value={form.whatsapp}
            onSave={(v) => updateField("whatsapp", v)}
          />
          <EditableField
            label="Telegram"
            value={form.telegram}
            onSave={(v) => updateField("telegram", v)}
          />
          <EditableField
            label="IMO"
            value={form.imo}
            onSave={(v) => updateField("imo", v)}
          />
          {errors.whatsapp ? (
            <Text className="text-red-500 text-sm mt-1 mb-3">
              {errors.whatsapp}
            </Text>
          ) : null}
        </View>

        {/* Bio */}
        <View
          onLayout={(event) => {
            positions.current.bio = event.nativeEvent.layout.y;
          }}
        >
          <Text className="text-xs font-bold text-gray-400 tracking-widest mt-6 mb-1">
            ABOUT
          </Text>
          <EditableField
            label="Bio"
            value={form.bio}
            fieldType="address"
            onSave={(v) => updateField("bio", v)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
