import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '../../../components/profile/ProfileCard';
import StatsCard from '../../../components/profile/StatsCard';
import RecentReviews from '../../../components/profile/RecentReviews';
import ActiveJobCard from '../../../components/profile/ActiveJobCard';
import SwitchRoleRow from '../../../components/profile/SwitchRoleRow';
import LogoutRow from '../../../components/profile/LogoutRow';
import {
  HELPER_PROFILE, POSTER_PROFILE,
  DUMMY_REVIEWS, POSTER_REVIEWS, POSTER_ACTIVE_JOBS,
} from '../../../constants/dummyProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter } from 'expo-router';
import { userRoleStore } from '../../../store/userRoleStore';

const ProfileScreen = () => {
  
const { isHelper } = userRoleStore();
  const profile = isHelper ? HELPER_PROFILE : POSTER_PROFILE;

  const onLogout = async () => {
    const router = useRouter();
    // clear onboarding and login data
      try {
          await AsyncStorage.removeItem('@viewedOnboarding');
          await AsyncStorage.removeItem('@isLoggedIn');
          Alert.alert('Logged out')
        } catch (error) {
          console.log("Error @checkOnboarding: ", error);
        }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Nav bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-gray-50">
        <Text className="text-2xl font-bold text-teal-700">Profile</Text>
        <TouchableOpacity onPress={() => router.push('/profileEdit/edit')}>
          <Text className="text-base font-medium text-teal-700">Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Identity card */}
        <ProfileCard
          name={profile.name}
          badge={profile.badge}
          rating={profile.rating}
          reviewCount={profile.reviewCount}
          avatarUri={profile.avatarUri}
          badgeColor={isHelper ? '#0f6e56' : '#185fa5'}
        />

        {/* Stats */}
        {isHelper ? (
          <StatsCard
            left={{ label: 'JOBS\nCOMPLETED', value: String((HELPER_PROFILE as any).jobsCompleted) }}
            right={{ label: 'TOTAL\nEARNINGS', value: `৳${((HELPER_PROFILE as any).totalEarnings).toLocaleString()}` }}
          />
        ) : (
          <StatsCard
            left={{ label: 'JOBS\nPOSTED', value: String((POSTER_PROFILE as any).jobsPosted) }}
            right={{ label: 'TOTAL\nSPENT', value: `৳${((POSTER_PROFILE as any).totalSpent).toLocaleString()}` }}
          />
        )}

        {/* Poster-only: active jobs */}
        {!isHelper && (
          <ActiveJobCard
            jobs={POSTER_ACTIVE_JOBS}
            onSeeAll={() => console.log('see all jobs')}
          />
        )}

        {/* Reviews */}
        <RecentReviews
          reviews={isHelper ? DUMMY_REVIEWS : POSTER_REVIEWS}
          onSeeAll={() => console.log('see all reviews')}
        />

        {/* Role switcher — also the demo UI switcher */}
        <SwitchRoleRow  />

        {/* Logout */}
        <LogoutRow onLogout={onLogout} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;