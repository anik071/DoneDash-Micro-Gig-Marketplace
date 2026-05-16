import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  name: string;
  badge: string;
  rating: number;
  reviewCount: number;
  avatarUri: string;
  badgeColor?: string;
};

const ProfileCard = ({
  name, badge, rating, reviewCount, avatarUri, badgeColor = '#0f6e56'
}: Props) => (
  <View className="bg-white rounded-2xl p-4 mx-4 mb-3 flex-row items-center gap-4 border border-gray-100">
    <Image
      source={{ uri: avatarUri }}
      className="w-16 h-16 rounded-full"
    />
    <View className="flex-1">
      <View className="flex-row items-center gap-2 flex-wrap">
        <Text className="text-lg font-bold text-gray-900">{name}</Text>
        <View style={{ backgroundColor: badgeColor + '18', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: badgeColor, letterSpacing: 0.5 }}>
            {badge}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-1 mt-1">
        <Ionicons name="star" size={14} color="#f59e0b" />
        <Text className="text-sm font-semibold text-gray-800">{rating}</Text>
        <Text className="text-sm text-gray-400">({reviewCount} reviews)</Text>
      </View>
    </View>
  </View>
);

export default ProfileCard;