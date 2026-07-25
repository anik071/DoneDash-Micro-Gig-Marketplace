import React from "react";
import { View, Text, TouchableOpacity, Linking, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import LoadingScreen from "../components/common/LoadingScreen";
import { useJobDetails } from "../hooks/useJobDetails";

const AcceptedJobsScreen = () => {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();

  const router = useRouter();

  const { job, loading, error } = useJobDetails(jobId);

  if (loading) return <LoadingScreen />;

  if (error || !job) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-100">
        <Text className="text-gray-700">{error || "Job not found"}</Text>
      </SafeAreaView>
    );
  }

  const helper = job.accepted_helper;

  const helperName = helper
    ? `${helper.first_name ?? ""} ${helper.last_name ?? ""}`.trim()
    : "Helper";

  const initials = helperName
    .split(" ")
    .map((x: string) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const openWhatsapp = () => {
    if (!helper?.whatsapp) return;

    Linking.openURL(`https://wa.me/88${helper.whatsapp}`);
  };

  const openTelegram = () => {
    if (!helper?.telegram) return;

    Linking.openURL(`https://t.me/${helper.telegram}`);
  };

  const openImo = () => {
    if (!helper?.imo) return;

    Linking.openURL(`imo://im?phone=88${helper.imo}`);
  };

  const ContactButton = ({ enabled, onPress, children }: any) => (
    <TouchableOpacity
      disabled={!enabled}
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-xl py-3 mb-3 ${
        enabled ? "bg-emerald-600" : "bg-gray-200"
      }`}
    >
      {children}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 pt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#0f6e56" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-[#0f6e56] mt-5">
          Active Job
        </Text>
      </View>

      <View className="mx-5 mt-5 bg-white rounded-3xl p-5">
        <View className="flex-row justify-between">
          <View className="bg-cyan-100 rounded-full px-3 py-1">
            <Text className="text-cyan-700 text-xs font-bold">IN PROGRESS</Text>
          </View>

          <Text className="text-xl font-bold text-emerald-700">
            ৳{job.budget}
          </Text>
        </View>

        <Text className="text-xl font-bold text-gray-900 mt-5">
          {job.title}
        </Text>

        <Text className="text-gray-500 mt-2">{job.description}</Text>
      </View>

      <View className="mx-5 mt-4 bg-white rounded-3xl p-5">
        <Text className="text-gray-400 uppercase text-xs font-bold">
          Assigned Helper
        </Text>

        <View className="flex-row items-center mt-4">
          {helper?.avatar ? (
            <Image
              source={{
                uri: helper.avatar,
              }}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <View className="w-16 h-16 rounded-full bg-emerald-600 items-center justify-center">
              <Text className="text-white text-lg font-bold">{initials}</Text>
            </View>
          )}

          <View className="ml-4">
            <Text className="text-lg font-bold text-gray-900">
              {helperName}
            </Text>

            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={14} color="#f59e0b" />

              <Text className="ml-1 font-semibold">
                {helper?.average_rating ?? 0}
              </Text>

              <Text className="ml-2 text-gray-400">
                ({helper?.completed_jobs ?? 0} jobs)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mx-5 mt-4 bg-white rounded-3xl p-5">
        <Text className="text-gray-400 uppercase text-xs font-bold mb-4">
          Contact Helper
        </Text>

        <ContactButton enabled={!!helper?.whatsapp} onPress={openWhatsapp}>
          <Ionicons
            name="logo-whatsapp"
            size={20}
            color={helper?.whatsapp ? "white" : "#9ca3af"}
          />

          <Text
            className={`ml-3 font-semibold ${
              helper?.whatsapp ? "text-white" : "text-gray-400"
            }`}
          >
            WhatsApp
          </Text>
        </ContactButton>

        <ContactButton enabled={!!helper?.telegram} onPress={openTelegram}>
          <Ionicons
            name="paper-plane"
            size={20}
            color={helper?.telegram ? "white" : "#9ca3af"}
          />

          <Text
            className={`ml-3 font-semibold ${
              helper?.telegram ? "text-white" : "text-gray-400"
            }`}
          >
            Telegram
          </Text>
        </ContactButton>

        <ContactButton enabled={!!helper?.imo} onPress={openImo}>
          <MaterialCommunityIcons
            name="chat"
            size={20}
            color={helper?.imo ? "white" : "#9ca3af"}
          />

          <Text
            className={`ml-3 font-semibold ${
              helper?.imo ? "text-white" : "text-gray-400"
            }`}
          >
            IMO
          </Text>
        </ContactButton>
      </View>
    </SafeAreaView>
  );
};

export default AcceptedJobsScreen;
