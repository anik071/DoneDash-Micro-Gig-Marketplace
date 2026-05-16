import { View, Text, FlatList } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useMemo } from 'react';
import { DUMMY_JOBS } from '../../../constants/dummyJobs';
import JobCard from '../../../components/feed/JobCard';
import FilterChips from '../../../components/feed/FilterChips';

const FeedScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() =>
    activeFilter === 'All'
      ? DUMMY_JOBS
      : DUMMY_JOBS.filter(j => j.category === activeFilter),
    [activeFilter]
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View className="flex-1 bg-gray-50">
        <View style={{flexShrink: 0}}>
      <FilterChips active={activeFilter} onSelect={setActiveFilter} />
        </View>
      <View className="px-4 pt-2 pb-1 flex-row justify-between items-center">
        <View>
          <Text className="text-xl font-bold text-gray-900">Available Gigs</Text>
          <Text className="text-sm text-gray-500">Found {filtered.length} jobs in your campus area</Text>
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
      </View>
    </SafeAreaView>
  )
}

export default FeedScreen
