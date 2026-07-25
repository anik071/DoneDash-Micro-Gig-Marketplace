import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMyPostedJobs } from "../../hooks/useMyPostedJobs";
import PosterJobCard from "./PosterJobCard";
import { useProfile } from "../../hooks/useProfile";

const PosterJobsScreen = () => {
  const router = useRouter();
  const { jobs = [], loading, error } = useMyPostedJobs();
  const { profile } = useProfile();
  const isHelper = profile?.role === "helper";
  const activeJobsCount = jobs.filter((j) => j.status !== "COMPLETED").length;

  const handleJobPress = (jobId: string) => {
    router.push({
      pathname: "/receivedProposals",
      params: { jobId },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f5f9" }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 14 }}>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#0f6e56" }}>
          {isHelper ? "Applied Jobs" : "My Posted Jobs"}
        </Text>
        <Text style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
          {activeJobsCount} active
        </Text>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleJobPress(item.id)}
          >
            <PosterJobCard item={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingTop: 80 }}>
            <Ionicons name="briefcase-outline" size={48} color="#d1d5db" />
            <Text style={{ color: "#9ca3af", fontSize: 15, marginTop: 12 }}>
              No jobs yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default PosterJobsScreen;
