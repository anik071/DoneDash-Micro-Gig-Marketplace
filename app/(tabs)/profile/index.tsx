import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../../components/profile/ProfileCard";
import StatsCard from "../../../components/profile/StatsCard";
import RecentReviews from "../../../components/profile/RecentReviews";
import ActiveJobCard from "../../../components/profile/ActiveJobCard";
import SwitchRoleRow from "../../../components/profile/SwitchRoleRow";
import LogoutRow from "../../../components/profile/LogoutRow";
import { router, useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase";
import { useProfile } from "../../../hooks/useProfile";
import LoadingScreen from "../../../components/common/LoadingScreen";
const ProfileScreen = () => {
  const { profile, loading, error, activeJobs } = useProfile();

  const isHelper = profile?.role === "helper";

  const router = useRouter();
  const onLogout = async () => {
    // clear onboarding and login data
    try {
      await supabase.auth.signOut();
      router.replace("/login");
    } catch (error) {
      console.log("Error @checkOnboarding: ", error);
    }
  };

  if (loading) return <LoadingScreen />;

  if (error || !profile) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-6">
        <Text className="text-red-500 text-center">
          {error || "Unable to load profile."}
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Nav bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-gray-50">
        <Text className="text-2xl font-bold text-teal-700">Profile</Text>
        <TouchableOpacity onPress={() => router.push("/profileEdit/edit")}>
          <Text className="text-base font-medium text-teal-700">Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Identity card */}
        <ProfileCard
          name={`${profile.first_name} ${profile.last_name}`}
          badge={profile.role}
          rating={profile.average_rating ?? 0}
          reviewCount={0}
          avatarUri={profile.avatar ?? ""}
          badgeColor={isHelper ? "#0f6e56" : "#185fa5"}
        />
        {/* Stats */}
        {isHelper ? (
          <StatsCard
            left={{
              label: "JOBS\nCOMPLETED",
              value: String(profile.completed_jobs ?? 0),
            }}
            right={{
              label: "TOTAL\nEARNINGS",
              value: `৳${Number(profile.total_earnings ?? 0).toLocaleString()}`,
            }}
          />
        ) : (
          <StatsCard
            left={{
              label: "JOBS\nPOSTED",
              value: "--",
            }}
            right={{
              label: "TOTAL\nSPENT",
              value: "--",
            }}
          />
        )}
        {/* Poster-only: active jobs */}
        {!isHelper && (
          <ActiveJobCard
            jobs={activeJobs}
            onSeeAll={() => console.log("See all jobs")}
          />
        )}
        {/* Reviews */}
        {/* <RecentReviews
          reviews={isHelper ? DUMMY_REVIEWS : POSTER_REVIEWS}
          onSeeAll={() => console.log("see all reviews")}
        /> */}
        {/* Role switcher — also the demo UI switcher */}
        {/* Logout */}
        <LogoutRow onLogout={onLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
