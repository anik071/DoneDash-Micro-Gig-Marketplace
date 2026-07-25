import React from "react";
import ProposalsScreen from "../../../components/my-jobs/ProposalsScreen";
import MyJobsScreen from "../../../components/my-jobs/MyJobScreen";
import { useProfile } from "../../../hooks/useProfile";
import LoadingScreen from "../../../components/common/LoadingScreen";

const MyJobsTab = () => {
  const { profile, loading } = useProfile();
  if (loading) return <LoadingScreen />;
  const isHelper = profile?.role === "helper";
  console.log("isHelper", isHelper);
  return isHelper ? <MyJobsScreen /> : <ProposalsScreen />;
};

export default MyJobsTab;
