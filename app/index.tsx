import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
const Index = () => {
  const [loading, setLoading] = useState(true);

  const checkFlow = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/(tabs)/feed");
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.log("Error @checkFlow : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFlow();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
