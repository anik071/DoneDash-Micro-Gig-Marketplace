import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ProposalCard from "./ProposalCard";

type Props = {
  proposals: any[];
  onAccept: (proposal: any) => void;
};

const JobProposalsScreen = ({ proposals, onAccept }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 py-4">
        <Text className="text-2xl font-bold text-emerald-700">
          Proposals ({proposals.length})
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
