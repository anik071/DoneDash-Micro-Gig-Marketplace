import React from "react";
import { View, Text, FlatList } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";

import { useJobProposals } from "../hooks/useJobProposals";
import ProposalCard from "../components/my-jobs/ProposalCard";

const ReceivedProposals = () => {
  const { jobId } = useLocalSearchParams();
  const { proposals, loading, error } = useJobProposals(jobId as string);
  console.log("from my job proposals", proposals);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading proposals...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 py-4">
        <Text className="text-2xl font-bold text-green-700">
          Proposals ({proposals.length})
        </Text>
      </View>

      <FlatList
        data={proposals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProposalCard item={item} onAccept={() => {}} />
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      />
    </SafeAreaView>
  );
};

export default ReceivedProposals;
