import React from "react";
import { Stack } from "expo-router";

import HelperApplicationsScreen from "../components/my-jobs/HelperApplicationsScreen";

const HelperApplications = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <HelperApplicationsScreen />
    </>
  );
};

export default HelperApplications;
