import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { JobForm } from "../../../types/JobForm";
import FormField from "../../../components/post/FormField";
import CategoryPicker from "../../../components/post/CategoryPicker";
import DeadlinePicker from "../../../components/post/DeadlinePicker";
import PayInput from "../../../components/post/PayInput";
import ImageUploader from "../../../components/post/ImageUploader";
import { supabase } from "../../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { File } from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
const EMPTY: JobForm = {
  title: "",
  description: "",
  category: null,
  deadline: null,
  location: "",
  pay: "",
  images: [],
};

const inputStyle = {
  fontSize: 15,
  color: "#111827",
  borderBottomWidth: 1,
  borderBottomColor: "#e5e7eb",
  paddingVertical: 8,
};

const PostJobScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState<JobForm>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const set = (key: keyof JobForm, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    if (!form.title.trim()) {
      Alert.alert("Missing", "Job title is required.");
      return false;
    }
    if (!form.description.trim()) {
      Alert.alert("Missing", "Description is required.");
      return false;
    }
    if (!form.category) {
      Alert.alert("Missing", "Please select a category.");
      return false;
    }
    if (!form.deadline) {
      Alert.alert("Missing", "Please set a deadline.");
      return false;
    }
    if (!form.location.trim()) {
      Alert.alert("Missing", "Location is required.");
      return false;
    }
    if (!form.pay.trim()) {
      Alert.alert("Missing", "Pay amount is required.");
      return false;
    }
    return true;
  };

  const uploadImages = async (uris: string[]) => {
    const urls: string[] = [];
    const IMGBB_API_KEY = "256eaf7f3476d39f00723010ab666f0d";

    const MAX_BYTE_SIZE = 33554432;

    for (let uri of uris) {
      try {
        const fileInstance = new File(uri);
        const fileInfo = fileInstance.info();

        if (!fileInfo.exists) {
          console.error("File does not exist");
          continue;
        }

        const fileSize = fileInfo.size ?? 0;

        if (fileSize > MAX_BYTE_SIZE) {
          console.log(
            `Image is too large (${(fileSize / 1024 / 1024).toFixed(2)} MB). Compressing...`,
          );

          const context = ImageManipulator.manipulate(uri);
          context.resize({ width: 2000 });

          const imageRef = await context.renderAsync();

          const manipulatedImage = await imageRef.saveAsync({
            compress: 0.7,
            format: SaveFormat.JPEG,
          });

          uri = manipulatedImage.uri;

          const compressedFileInstance = new File(uri);
          const newInfo = compressedFileInstance.info();
          const compressedSize = newInfo.size ?? 0;

          if (newInfo.exists) {
            console.log(
              `New compressed size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`,
            );
          }
        }

        const formData = new FormData();
        const fileExt = uri.split(".").pop();
        const fileName = `job_image.${fileExt}`;

        formData.append("image", {
          uri: uri,
          name: fileName,
          type: `image/${fileExt === "jpg" ? "jpeg" : fileExt}`,
        } as any);

        formData.append("key", IMGBB_API_KEY);

        // Execute fetch upload request to the API endpoint, NOT the main website
        const response = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json", // Tells the server you expect JSON back
            "Content-Type": "multipart/form-data",
          },
        });
        const result = await response.json();
        if (result.success) {
          urls.push(result.data.url);
        } else {
          console.error("ImgBB Upload Failed:", result.error);
        }
      } catch (error) {
        console.error("Error processing/uploading image:", error);
      }
    }
    return urls;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Not authenticated", "Please log in to post a job.");
        setSubmitting(false);
        return;
      }
      const { data: job, error: insertError } = await supabase
        .from("jobs")
        .insert({
          poster_id: user.id,
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          deadline: form.deadline,
          location: form.location.trim(),
          pay: form.pay.trim(),
          images: [],
        })
        .select()
        .single();
      if (insertError) throw insertError;
      let imageUrls: string[] = [];
      if (form.images.length > 0) {
        imageUrls = await uploadImages(form.images);
        const { error: updateError } = await supabase
          .from("jobs")
          .update({ images: imageUrls })
          .eq("id", job.id);
        if (updateError) throw updateError;
      }

      Alert.alert("Posted!", "Your job has been posted successfully.");
      setForm(EMPTY);
      router.back();
    } catch (error: any) {
      console.error("Error posting job:", error);
      Alert.alert(
        "Error",
        error.message ?? "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      {/* Nav bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#fff",
          borderBottomWidth: 0.5,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 15, color: "#0f6e56", fontWeight: "500" }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
          Post a job
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              onChangeText={(t) => set("title", t)}
              placeholder="e.g. Help me move dorm stuff"
              placeholderTextColor="#9ca3af"
            />
          </FormField>

          <FormField label="DESCRIPTION" required>
            <TextInput
              style={[
                inputStyle,
                {
                  height: 100,
                  textAlignVertical: "top",
                  borderBottomWidth: 0,
                  borderWidth: 0,
                  paddingVertical: 0,
                },
              ]}
              value={form.description}
              onChangeText={(t) => set("description", t)}
              placeholder={
                "Describe what you need help with.\nInclude any specific tools or skills required..."
              }
              placeholderTextColor="#9ca3af"
              multiline
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#e5e7eb",
                marginTop: 8,
              }}
            />
          </FormField>

          <FormField label="CATEGORY" required>
            <CategoryPicker
              value={form.category}
              onChange={(c) => set("category", c)}
            />
          </FormField>

          <FormField label="DEADLINE" required>
            <DeadlinePicker
              value={form.deadline}
              onChange={(d) => set("deadline", d)}
            />
          </FormField>

          <FormField label="LOCATION" required>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#e5e7eb",
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color="#0f6e56"
                style={{ marginRight: 6 }}
              />
              <TextInput
                style={[inputStyle, { flex: 1, borderBottomWidth: 0 }]}
                value={form.location}
                onChangeText={(t) => set("location", t)}
                placeholder="Where is this job located?"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </FormField>

          <FormField label="PAY" required>
            <PayInput value={form.pay} onChange={(v) => set("pay", v)} />
          </FormField>

          <FormField label="UPLOAD IMAGES">
            <ImageUploader
              images={form.images}
              onChange={(imgs) => set("images", imgs)}
            />
          </FormField>

          {/* Post button */}
          <TouchableOpacity
            onPress={submit}
            disabled={submitting}
            style={{
              backgroundColor: submitting ? "#2d7a3a" : "#9ca3af",
              paddingVertical: 16,
              alignItems: "center",
              marginTop: 8,
            }}
            activeOpacity={0.85}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Post job
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostJobScreen;
