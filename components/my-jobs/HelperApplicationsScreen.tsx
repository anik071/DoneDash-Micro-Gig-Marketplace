import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoadingScreen from "../common/LoadingScreen";
import HelperApplicationCard from "./HelperApplicationCard";

import { useHelperApplications } from "../../hooks/useHelperApplications";

const HelperApplicationsScreen = () => {
  const { applications, loading, error } = useHelperApplications();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-slate-100 justify-center items-center px-6">
        <Text className="text-base text-red-500 text-center">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 pt-5 pb-4">
        <Text className="text-3xl font-bold text-[#0f6e56]">Applications</Text>

        <Text className="text-gray-500 mt-1">
          Track your pending and rejected proposals
        </Text>
      </View>

      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HelperApplicationCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-28">
            <Text className="text-6xl mb-5">📭</Text>

            <Text className="text-xl font-bold text-gray-800">
              No Applications
            </Text>

            <Text className="text-gray-500 text-center mt-3 px-10 leading-6">
              Your pending, rejected and withdrawn proposals will appear here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HelperApplicationsScreen;
