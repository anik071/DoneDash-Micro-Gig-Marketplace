import { ScrollView, TouchableOpacity, Text } from 'react-native';

const CATEGORIES = ['Physical', 'Academic', 'Tutoring', 'Delivery', 'Digital'];

const COLORS: Record<string, { active: string; text: string }> = {
  Physical: { active: '#0f6e56', text: '#fff' },
  Academic:  { active: '#185fa5', text: '#fff' },
  Tutoring:  { active: '#854f0b', text: '#fff' },
  Delivery:  { active: '#993c1d', text: '#fff' },
  Digital:   { active: '#534ab7', text: '#fff' },
};

type Props = { value: string | null; onChange: (c: string) => void };

const CategoryPicker = ({ value, onChange }: Props) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
  >
    {CATEGORIES.map(c => {
      const active = value === c;
      return (
        <TouchableOpacity
          key={c}
          onPress={() => onChange(c)}
          style={{
            height: 36,
            paddingHorizontal: 16,
            borderRadius: 8,
            justifyContent: 'center',
            backgroundColor: active ? COLORS[c].active : '#f3f4f6',
            borderWidth: active ? 0 : 0.5,
            borderColor: '#e5e7eb',
          }}
        >
          <Text style={{
            fontSize: 13,
            fontWeight: '500',
            color: active ? COLORS[c].text : '#4b5563',
          }}>
            {c}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default CategoryPicker;