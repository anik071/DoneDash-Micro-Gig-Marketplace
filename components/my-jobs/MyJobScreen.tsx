import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_MY_JOBS } from '../../constants/dummyProposals';
import MyJobCard from './MyJobCard';
import { useRouter } from 'expo-router';

const MyJobsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 14 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f6e56' }}>My Jobs</Text>
        <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
          {DUMMY_MY_JOBS.filter(j => j.status !== 'Completed').length} active
        </Text>
      </View>

      <FlatList
        data={DUMMY_MY_JOBS}
        keyExtractor={item => item.id}
        // ↓ only change in the FlatList — wrap MyJobCard in TouchableOpacity
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push(`/completeJob?id=${item.id}`)}
          >
            <MyJobCard item={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 80 }}>
            <Ionicons name="briefcase-outline" size={48} color="#d1d5db" />
            <Text style={{ color: '#9ca3af', fontSize: 15, marginTop: 12 }}>No jobs yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default MyJobsScreen;