import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JobGallery from "./JobGallery";
import JobInfoGrid from "./JobInfoGrid";
import PosterCard from "./PosterCard";
import JobDescription from "./JobDescription";
import JobDeadlineCard from "./JobDeadlineCard";

type Props = {
  job: any;
};

const getPostedAgo = (date: string) => {
  const now = new Date();
  const created = new Date(date);

  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const JobHeroCard = ({ job }: Props) => {
  const poster = job.profiles;

  const posterName = poster
    ? `${poster.first_name ?? ""} ${poster.last_name ?? ""}`.trim()
    : "Anonymous";

  const initials = posterName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="bg-white rounded-3xl overflow-hidden">
      {/* ====================== */}
      {/* HERO IMAGE */}
      {/* ====================== */}

      <View className="relative">
        <JobGallery images={job.images ?? []} />

        <View className="absolute top-4 left-4 bg-emerald-600 px-4 py-2 rounded-full">
          <Text className="text-white text-xs font-bold tracking-wider">
            OPEN
          </Text>
        </View>

        <View className="absolute bottom-4 right-4 bg-white rounded-2xl px-4 py-3 shadow-lg">
          <Text className="text-gray-400 text-xs">Budget</Text>

          <Text className="text-2xl font-bold text-emerald-700">
            ৳ {job.budget}
          </Text>
        </View>
      </View>

      {/* ====================== */}
      {/* CONTENT */}
      {/* ====================== */}

      <View className="p-6">
        {/* Category */}

        <View className="self-start bg-teal-100 rounded-full px-4 py-2">
          <Text className="text-teal-700 font-semibold text-xs tracking-wide">
            {job.category?.toUpperCase()}
          </Text>
        </View>

        {/* Title */}

        <Text className="text-3xl font-bold text-gray-900 mt-5 leading-9">
          {job.title}
        </Text>

        {/* Time */}

        <View className="flex-row items-center mt-3">
          <Ionicons name="time-outline" size={16} color="#6B7280" />

          <Text className="text-gray-500 ml-2">
            Posted {getPostedAgo(job.created_at)}
          </Text>
        </View>

        {/* ====================== */}
        {/* POSTER */}
        {/* ====================== */}
        <PosterCard profile={job.profiles} />
        {/* ====================== */}
        {/* JOB DETAILS */}
        {/* ====================== */}
        <JobInfoGrid job={job} />

        <JobDeadlineCard deadline={job.deadline} />
        {/* ====================== */}
        {/* DESCRIPTION */}
        {/* ====================== */}
        <JobDescription description={job.description} />
      </View>
    </View>
  );
};

export default JobHeroCard;
