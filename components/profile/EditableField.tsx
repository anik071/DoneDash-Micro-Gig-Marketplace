import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { pickProfileImage } from "../../services/imageUploadService";
interface Props {
  label: string;
  value: string;

  onSave?: (value: string) => void;

  fieldType?: "text" | "email" | "phone" | "address" | "avatar";

  editable?: boolean;
}

const EditableField = ({
  label,
  value,
  onSave,
  fieldType = "text",
  editable = true,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const save = () => {
    onSave?.(tempValue);
    setEditing(false);
  };

  if (fieldType === "avatar") {
    return (
      <View className="items-center mt-6">
        <View>
          <Image
            source={{
              uri: value || "https://i.pravatar.cc/150",
            }}
            className="w-28 h-28 rounded-full"
          />

          <TouchableOpacity
            className="absolute bottom-0 right-0 bg-teal-700 w-9 h-9 rounded-full items-center justify-center"
            onPress={async () => {
              try {
                const image = await pickProfileImage();

                if (image) {
                  onSave?.(image);
                }
              } catch (error: any) {
                console.log(error.message);
              }
            }}
          >
            <Ionicons name="camera" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-sm text-gray-500 mt-3">Change profile photo</Text>
      </View>
    );
  }

  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-500 mb-2">{label}</Text>

      <View
        className={`flex-row items-center rounded-xl px-4 py-3 ${
          editable ? "bg-gray-100" : "bg-gray-200"
        }`}
      >
        {editing && editable ? (
          <TextInput
            value={tempValue}
            onChangeText={setTempValue}
            multiline={fieldType === "address"}
            editable={editable}
            className="flex-1 text-base text-gray-900"
            style={{
              minHeight: fieldType === "address" ? 80 : undefined,
              textAlignVertical: fieldType === "address" ? "top" : "center",
            }}
          />
        ) : (
          <Text
            className={`flex-1 text-base ${
              editable ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {value || "Not added"}
          </Text>
        )}

        {editable && (
          <TouchableOpacity
            onPress={() => {
              if (editing) {
                save();
              } else {
                setTempValue(value);
                setEditing(true);
              }
            }}
          >
            <Ionicons
              name={editing ? "checkmark" : "create-outline"}
              size={20}
              color="#0f6e56"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EditableField;
