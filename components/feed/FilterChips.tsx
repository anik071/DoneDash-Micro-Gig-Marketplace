import { ScrollView, TouchableOpacity, Text } from 'react-native';

const FILTERS = ['All', 'Physical', 'Academic', 'Tutoring', 'Delivery', 'Digital'];

type Props = {
  active: string;
  onSelect: (f: string) => void;
};

const FilterChips = ({ active, onSelect }: Props) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal: 16,
      paddingVertical: 10,
      alignItems: 'center',
      gap: 8,
    }}
  >
    {FILTERS.map(f => {
      const isActive = active === f;
      
      return (
        <TouchableOpacity
          key={f}
          onPress={() => onSelect(f)}
          className={`h-9 px-4 rounded-full justify-center items-center ${
            isActive ? 'bg-[#0f6e56]' : 'bg-gray-100'
          }`}
        >
          <Text
            className={`text-[13px] font-medium ${
              isActive ? 'text-white' : 'text-gray-600'
            }`}
          >
            {f}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default FilterChips;
