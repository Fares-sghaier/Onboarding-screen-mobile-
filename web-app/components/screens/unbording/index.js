import { StatusBar } from "expo-status-bar";
import {
  StyleSheet, 
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Onboarding from "./Onboarding";
import { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewOnboarding, setViewOnboarding] = useState(true);
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewOnboarding ");
      if (value == null) {
        setViewOnboarding(true);
      }
    } catch (err) {
      console.log("error @checkOnboarding", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkOnboarding();
  }, []);
  return (
    <View style={styles.container}>
      <Onboarding /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
