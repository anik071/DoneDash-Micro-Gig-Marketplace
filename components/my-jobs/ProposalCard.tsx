import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Proposal } from '../../constants/dummyProposals';

type Props = { item: Proposal; onAccept: (id: string) => void };

const ProposalCard = ({ item, onAccept }: Props) => (
  <View style={{
    backgroundColor: '#fff', borderRadius: 16,
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 8, elevation: 2,
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
      <Image
        source={{ uri: item.avatarUri }}
        style={{ width: 56, height: 56, borderRadius: 10, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
          <Ionicons name="star" size={13} color="#f59e0b" />
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151' }}>{item.rating}</Text>
          <Text style={{ fontSize: 13, color: '#9ca3af' }}>({item.reviewCount} reviews)</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#0f6e56' }}>৳{item.proposedPay}</Text>
        <Text style={{ fontSize: 10, fontWeight: '600', color: '#9ca3af', letterSpacing: 0.5 }}>
          PROPOSED PAY
        </Text>
      </View>
    </View>

    <Text style={{ fontSize: 13, color: '#4b5563', lineHeight: 19, marginBottom: 14 }}
      numberOfLines={3}>
      {item.coverLetter}
    </Text>

    <TouchableOpacity
      onPress={() => onAccept(item.id)}
      style={{
        backgroundColor: '#0f6e56', borderRadius: 12,
        paddingVertical: 13, alignItems: 'center',
      }}
      activeOpacity={0.85}
    >
      <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>
        Accept {item.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  </View>
);

export default ProposalCard;