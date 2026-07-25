import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ProposalCard from "./ProposalCard";
import { router } from "expo-router";

type Props = {
  proposals: any[];
  onAccept: (proposal: any) => void;
};

const JobProposalsScreen = ({ proposals, onAccept }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 pt-5 pb-6 bg-slate-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-gray-900 mt-5">
          Job Proposals
        </Text>

        <Text className="text-gray-500 mt-1">
          {proposals.length} helpers applied for this job
        </Text>
      </View>
      <View className="mx-5 mb-5 rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
        <Text className="font-bold text-emerald-700 text-base">
          Choose Carefully
        </Text>

        <Text className="text-gray-600 mt-2 leading-6">
          Accepting one helper will automatically reject the remaining proposals
          and start the job.
        </Text>
      </View>
      <FlatList
        data={proposals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProposalCard item={item} onAccept={onAccept} />
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center pt-24">
            <Ionicons name="document-text-outline" size={48} color="#d1d5db" />

            <Text className="text-gray-400 mt-3 text-base">
              No proposals yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default JobProposalsScreen;
