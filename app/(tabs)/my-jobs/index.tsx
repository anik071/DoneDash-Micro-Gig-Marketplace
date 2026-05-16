import React from 'react';
import ProposalsScreen from '../../../components/my-jobs/ProposalsScreen';
import MyJobsScreen from '../../../components/my-jobs/MyJobScreen';
import { userRoleStore } from '../../../store/userRoleStore';

const MyJobsTab = () => {
  const { isHelper } = userRoleStore();
  return isHelper ? <MyJobsScreen /> : <ProposalsScreen />;
};

export default MyJobsTab;