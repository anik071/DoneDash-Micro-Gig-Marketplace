import { View, Text } from 'react-native';

type StatItem = { label: string; value: string };

type Props = { left: StatItem; right: StatItem };

const StatsCard = ({ left, right }: Props) => (
  <View className="bg-white rounded-2xl mx-4 mb-3 flex-row border border-gray-100 overflow-hidden">
    <View className="flex-1 p-4">
      <Text className="text-xs font-semibold text-gray-400 tracking-widest leading-tight">
        {left.label}
      </Text>
      <Text className="text-3xl font-bold text-teal-700 mt-2">{left.value}</Text>
    </View>
    <View className="w-px bg-teal-600 my-4" />
    <View className="flex-1 p-4">
      <Text className="text-xs font-semibold text-gray-400 tracking-widest leading-tight">
        {right.label}
      </Text>
      <Text className="text-3xl font-bold text-teal-700 mt-2">{right.value}</Text>
    </View>
  </View>
);

export default StatsCard;