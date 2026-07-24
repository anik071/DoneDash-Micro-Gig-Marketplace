import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { usePostJob } from "../../../hooks/usePostJob";

import PostJobHeader from "../../../components/post/PostJobHeader";
import JobBasicInfo from "../../../components/post/JobBasicInfo";
import JobDetails from "../../../components/post/JobDetails";
import JobImages from "../../../components/post/JobImages";
import SubmitJobButton from "../../../components/post/SubmitJobButton";

const PostJobScreen = () => {
  const router = useRouter();

  const { form, updateField, submit, submitting } = usePostJob();

  const handleSubmit = async () => {
    const success = await submit();

    if (success) {
      router.back();
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f9fafb",
      }}
    >
      <PostJobHeader />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <JobBasicInfo
            title={form.title}
            description={form.description}
            updateField={updateField}
          />

          <JobDetails form={form} updateField={updateField} />

          <JobImages images={form.images} updateField={updateField} />

          <SubmitJobButton submitting={submitting} onPress={handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PostJobScreen;
