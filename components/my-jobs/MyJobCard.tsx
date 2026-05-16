import React from 'react';
import { View, Text, Image } from 'react-native';
import { MyJob } from '../../constants/dummyProposals';

const STATUS_CONFIG = {
  'In Progress': { bg: '#dff0f5', text: '#0f6e56' },
  'Completed':   { bg: '#dcf5e7', text: '#1a7a3c' },
  'Pending':     { bg: '#fef3c7', text: '#b45309' },
};

const CATEGORY_COLOR: Record<string, string> = {
  Tutoring: '#854f0b',
  Delivery: '#993c1d',
  Digital:  '#534ab7',
  Physical: '#0f6e56',
  Academic: '#185fa5',
};

type Props = { item: MyJob };

const MyJobCard = ({ item }: Props) => {
  const statusStyle = STATUS_CONFIG[item.status];
  const catColor = CATEGORY_COLOR[item.category] ?? '#0f6e56';

  return (
    <View style={{
      backgroundColor: '#fff', borderRadius: 16,
      padding: 16, marginBottom: 12,
      shadowColor: '#000', shadowOpacity: 0.04,
      shadowRadius: 8, elevation: 2,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <View style={{
          backgroundColor: catColor + '18', borderRadius: 6,
          paddingHorizontal: 8, paddingVertical: 3,
        }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: catColor, letterSpacing: 0.5 }}>
            {item.category.toUpperCase()}
          </Text>
        </View>
        <View style={{
          backgroundColor: statusStyle.bg, borderRadius: 6,
          paddingHorizontal: 8, paddingVertical: 3,
        }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: statusStyle.text }}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 10 }}>
        {item.title}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image
            source={{ uri: item.posterAvatar }}
            style={{ width: 26, height: 26, borderRadius: 13 }}
          />
          <Text style={{ fontSize: 13, color: '#6b7280' }}>{item.posterName}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#0f6e56' }}>৳{item.pay}</Text>
          <Text style={{ fontSize: 11, color: '#9ca3af' }}>{item.dueDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyJobCard;