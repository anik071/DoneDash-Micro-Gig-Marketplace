import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo } from "react";
import { useFeed } from "../../../hooks/useFeed";
import JobCard from "../../../components/feed/JobCard";
import FilterChips from "../../../components/feed/FilterChips";
import FeedHeader from "../../../components/feed/FeedHeader";
import FeedSearch from "../../../components/feed/FeedSearch";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
const FeedScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { jobs, loading, error, refreshFeed } = useFeed();
  const currentUser = useCurrentUser();
  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCategory =
        activeFilter === "All" || job.category === activeFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        `${job.profiles?.first_name ?? ""} ${job.profiles?.last_name ?? ""}`
          .toLowerCase()
          .includes(q) ||
        job.category.toLowerCase().includes(q); // bonus: search by category name too

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery, jobs]);

  const hasActiveFilters = searchQuery.length > 0 || activeFilter !== "All";

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading jobs...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-6">
        <Text className="text-red-500 text-center">{error}</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FeedHeader
        name={currentUser?.first_name ?? ""}
        avatarUri={currentUser?.avatar ?? ""}
        hasNotification
        onNotificationPress={() => console.log("notifications pressed")}
      />

      <View className="flex-1 bg-gray-50">
        <FeedSearch
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
        <View style={{ flexShrink: 0 }}>
          <FilterChips active={activeFilter} onSelect={setActiveFilter} />
        </View>
        <View className="px-4 pt-1 pb-2 flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-bold text-gray-900">
              Available Gigs
            </Text>
            <Text className="text-sm text-gray-500">
              Found {filtered.length} job{filtered.length !== 1 ? "s" : ""} in
              your campus area
            </Text>
          </View>
          {hasActiveFilters && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
            >
              <Text className="text-sm text-teal-700 font-medium">
                Clear all
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={filtered}
          refreshing={loading}
          onRefresh={refreshFeed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobCard job={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;
