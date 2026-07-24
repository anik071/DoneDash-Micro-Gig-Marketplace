import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FormField from "./FormField";
import CategoryPicker from "./CategoryPicker";
import DeadlinePicker from "./DeadlinePicker";
import PayInput from "./PayInput";

interface Props {
  form: any;
  updateField: (key: any, value: any) => void;
}

const inputStyle = {
  fontSize: 15,
  color: "#111827",
  borderBottomWidth: 1,
  borderBottomColor: "#e5e7eb",
  paddingVertical: 8,
};

const JobDetails = ({ form, updateField }: Props) => {
  return (
    <>
      <FormField label="CATEGORY" required>
        <CategoryPicker
          value={form.category}
          onChange={(v) => updateField("category", v)}
        />
      </FormField>

      <FormField label="DEADLINE" required>
        <DeadlinePicker
          value={form.deadline}
          onChange={(v) => updateField("deadline", v)}
        />
      </FormField>

      <FormField label="LOCATION" required>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
          }}
        >
          <Ionicons
            name="location-outline"
            size={18}
            color="#0f6e56"
            style={{ marginRight: 6 }}
          />

          <TextInput
            style={[
              inputStyle,
              {
                flex: 1,
                borderBottomWidth: 0,
              },
            ]}
            value={form.location}
            onChangeText={(t) => updateField("location", t)}
            placeholder="Where is this job located?"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </FormField>

      <FormField label="PAY" required>
        <PayInput value={form.pay} onChange={(v) => updateField("pay", v)} />
      </FormField>
    </>
  );
};

export default JobDetails;
