import React from "react";
import { View, TextInput } from "react-native";

import FormField from "./FormField";

interface Props {
  title: string;
  description: string;
  updateField: (key: any, value: any) => void;
}

const inputStyle = {
  fontSize: 15,
  color: "#111827",
  borderBottomWidth: 1,
  borderBottomColor: "#e5e7eb",
  paddingVertical: 8,
};

const JobBasicInfo = ({ title, description, updateField }: Props) => {
  return (
    <>
      <FormField label="JOB TITLE" required>
        <TextInput
          style={inputStyle}
          value={title}
          onChangeText={(t) => updateField("title", t)}
          placeholder="e.g. Help me move dorm stuff"
          placeholderTextColor="#9ca3af"
        />
      </FormField>

      <FormField label="DESCRIPTION" required>
        <TextInput
          style={[
            inputStyle,
            {
              height: 100,
              textAlignVertical: "top",
              borderBottomWidth: 0,
              borderWidth: 0,
              paddingVertical: 0,
            },
          ]}
          multiline
          value={description}
          onChangeText={(t) => updateField("description", t)}
          placeholder="Describe what you need help with..."
          placeholderTextColor="#9ca3af"
        />

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
            marginTop: 8,
          }}
        />
      </FormField>
    </>
  );
};

export default JobBasicInfo;
