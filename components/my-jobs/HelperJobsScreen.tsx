import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const DEMO_JOBS = [
  {
    id: "1",
    title: "Math Tutoring for Class 10",
    status: "Proposal Sent",
    budget: 2000,
    date: "28 Jul",
  },
  {
    id: "2",
    title: "Deliver Documents",
    status: "Accepted",
    budget: 800,
    date: "Today",
  },
  {
    id: "3",
    title: "Design a Logo",
    status: "Completed",
    budget: 3500,
    date: "15 Jul",
  },
];

const STATUS = {
  "Proposal Sent": {
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  Accepted: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  Completed: {
    bg: "bg-slate-200",
    text: "text-slate-700",
  },
};

const HelperJobsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 py-4">
        <Text className="text-2xl font-bold text-[#0f6e56]">My Jobs</Text>

        <Text className="text-gray-500 mt-1">Jobs you've applied for</Text>
      </View>

      <FlatList
        data={DEMO_JOBS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        renderItem={({ item }) => {
          const status = STATUS[item.status as keyof typeof STATUS];

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-white rounded-2xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-base text-gray-900 flex-1 mr-3">
                  {item.title}
                </Text>

                <View className={`px-2 py-1 rounded-md ${status.bg}`}>
                  <Text
                    className={`text-[11px] font-bold uppercase ${status.text}`}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center mt-4">
                <Text className="font-bold text-[#0f6e56] text-lg">
                  ৳{item.budget}
                </Text>

                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                  <Text className="text-gray-500 ml-1 text-sm">
                    {item.date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HelperJobsScreen;
