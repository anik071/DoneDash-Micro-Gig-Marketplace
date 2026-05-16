import { useState } from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type Props = { value: Date | null; onChange: (d: Date) => void };

const DeadlinePicker = ({ value, onChange }: Props) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [tempDate, setTempDate] = useState<Date>(value ?? new Date());

  const formatted = value
    ? value.toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : 'Pick a date & time';

 const handleChange = (event: any, selected?: Date) => {
  if (event.type === 'dismissed' || !selected) {
    setShow(false);
    setMode('date');
    return;
  }

  if (mode === 'date') {
    setTempDate(selected);
    setMode('time');
  } 

  else {
    onChange(selected);
    setShow(false);
    setMode('date');
  }
};

  return (
    <>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 15, color: value ? '#111827' : '#9ca3af' }}>
          {formatted}
        </Text>
        <Ionicons name="calendar-outline" size={20} color="#0f6e56" />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={tempDate}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default DeadlinePicker;