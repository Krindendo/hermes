import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
