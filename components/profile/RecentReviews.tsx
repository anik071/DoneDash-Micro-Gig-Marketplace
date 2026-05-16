import { View, Text, TouchableOpacity } from 'react-native';
import ReviewCard from './ReviewCard';

type Review = {
  id: string;
  reviewerName: string;
  avatarUri: string;
  rating: number;
  comment: string;
  postedAgo: string;
};

type Props = { reviews: Review[]; onSeeAll?: () => void };

const RecentReviews = ({ reviews, onSeeAll }: Props) => (
  <View className="mx-4 mb-3">
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-xl font-bold text-gray-900">Recent reviews</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text className="text-sm font-medium text-teal-700">See all</Text>
      </TouchableOpacity>
    </View>
    {reviews.map(r => <ReviewCard key={r.id} {...r} />)}
  </View>
);

export default RecentReviews;