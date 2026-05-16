import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  reviewerName: string;
  avatarUri: string;
  rating: number;
  comment: string;
  postedAgo: string;
};

const ReviewCard = ({ reviewerName, avatarUri, rating, comment, postedAgo }: Props) => (
  <View className="bg-gray-50 rounded-2xl p-4 mb-3">
    <View className="flex-row items-center justify-between mb-1">
      <View className="flex-row items-center gap-3">
        <Image source={{ uri: avatarUri }} className="w-9 h-9 rounded-full" />
        <View>
          <Text className="text-sm font-semibold text-gray-900">{reviewerName}</Text>
          <View className="flex-row mt-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Ionicons
                key={i}
                name="star"
                size={12}
                color={i <= rating ? '#f59e0b' : '#e5e7eb'}
              />
            ))}
          </View>
        </View>
      </View>
      <Text className="text-xs text-gray-400">{postedAgo}</Text>
    </View>
    <Text className="text-sm text-gray-600 italic mt-2 leading-5">{comment}</Text>
  </View>
);

export default ReviewCard;