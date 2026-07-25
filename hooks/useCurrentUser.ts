import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

import { getCurrentUserProfile } from "../services/userService";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUserProfile();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, []),
  );

  return user;
};
