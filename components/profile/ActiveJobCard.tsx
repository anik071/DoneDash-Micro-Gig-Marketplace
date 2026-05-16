import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BADGE: Record<string, string> = {
  Tutoring: '#854f0b',
  Delivery: '#993c1d',
  Digital:  '#534ab7',
  Physical: '#0f6e56',
  Academic: '#185fa5',
};

type Job = { id: string; title: string; category: string; proposals: number };
type Props = { jobs: Job[]; onSeeAll?: () => void };

const ActiveJobCard = ({ jobs, onSeeAll }: Props) => (
  <View className="mx-4 mb-3">
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-xl font-bold text-gray-900">Active Jobs</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text className="text-sm font-medium text-teal-700">See all</Text>
      </TouchableOpacity>
    </View>
    {jobs.map(job => (
      <View key={job.id} className="bg-gray-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-1 mr-3">
          <View style={{
            alignSelf: 'flex-start',
            backgroundColor: BADGE[job.category] + '18',
            borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginBottom: 4
          }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: BADGE[job.category], letterSpacing: 0.5 }}>
              {job.category.toUpperCase()}
            </Text>
          </View>
          <Text className="text-sm font-semibold text-gray-900">{job.title}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-400">Proposals</Text>
          <Text className="text-lg font-bold text-teal-700">{job.proposals}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default ActiveJobCard;