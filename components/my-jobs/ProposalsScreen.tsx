import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_PROPOSALS } from '../../constants/dummyProposals';
import ProposalCard from './ProposalCard';

const ProposalsScreen = () => {
  const [proposals, setProposals] = useState(DUMMY_PROPOSALS);

  const handleAccept = (id: string) =>
    setProposals(prev => prev.filter(p => p.id !== id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
      <View style={{
        paddingHorizontal: 20, paddingVertical: 14,
      }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f6e56' }}>
          Proposals ({proposals.length})
        </Text>
      </View>

      <FlatList
        data={proposals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProposalCard item={item} onAccept={handleAccept} />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 80 }}>
            <Ionicons name="document-text-outline" size={48} color="#d1d5db" />
            <Text style={{ color: '#9ca3af', fontSize: 15, marginTop: 12 }}>
              No proposals yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ProposalsScreen;