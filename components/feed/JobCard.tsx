import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../../types/job';
import { useRouter } from 'expo-router';

const BADGE_STYLES: Record<string, string> = {
  Physical:  'bg-teal-50  text-teal-800',
  Academic:  'bg-blue-50  text-blue-800',
  Tutoring:  'bg-amber-50 text-amber-800',
  Delivery:  'bg-orange-50 text-orange-800',
  Digital:   'bg-purple-50 text-purple-800',
};

type Props = { job: Job };

const JobCard = ({ job }: Props) => {
  const router = useRouter();
  return (<TouchableOpacity
    activeOpacity={0.85}
     onPress={() => router.push(`/jobDetails?id=${job.id}`)}
    className="bg-white rounded-2xl p-4 border border-gray-100"
  >
    {/* Top row: badge + pay */}
    <View className="flex-row justify-between items-start mb-2">
      <View className={`px-3 py-1 rounded-full ${BADGE_STYLES[job.category]}`}>
        <Text className="text-xs font-semibold tracking-wider">
          {job.category.toUpperCase()}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-lg font-bold text-teal-700">৳{job.payAmount}</Text>
        <Text className="text-xs font-semibold text-gray-400 tracking-wider">
          {job.payType.toUpperCase()}
        </Text>
      </View>
    </View>

    {/* Title */}
    <Text className="text-[15px] font-semibold text-gray-900 mb-3 leading-snug">
      {job.title}
    </Text>

    {/* Footer: avatar + name + time */}
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: job.posterAvatar }}
          className="w-7 h-7 rounded-full"
        />
        <Text className="text-[13px] font-medium text-gray-700">{job.posterName}</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <Ionicons name="time-outline" size={13} color="#9ca3af" />
        <Text className="text-xs text-gray-400">{job.postedAgo}</Text>
      </View>
    </View>
  </TouchableOpacity>)
};

export default JobCard;