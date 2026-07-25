import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import SubmitProposalHeader from "../components/submitProposal/SubmitProposalHeader";
import ProposalJobCard from "../components/submitProposal/ProposalJobCard";
import ProposalTextInput from "../components/submitProposal/ProposalTextInput";
import ProposalTipsCard from "../components/submitProposal/ProposalTipsCard";
import SubmitProposalButton from "../components/submitProposal/SubmitProposalButton";

import { useJobDetails } from "../hooks/useJobDetails";
import { useSubmitProposal } from "../hooks/useSubmitProposal";

const SubmitProposalScreen = () => {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();

  const { job, loading } = useJobDetails(jobId);

  const {
    proposal,
    setProposal,
    loading: submitting,
    submit,
  } = useSubmitProposal(jobId);

  if (loading || !job) return null;
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <SubmitProposalHeader />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ProposalJobCard job={job} />

        <ProposalTextInput value={proposal} onChangeText={setProposal} />

        <ProposalTipsCard />

        <SubmitProposalButton loading={submitting} onPress={submit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubmitProposalScreen;
