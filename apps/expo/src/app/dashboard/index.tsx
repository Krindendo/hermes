import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

//import { useSession } from "~/components/ctx";

export default function LoginScreen() {
  const handleAcceptDevice = (deviceId: number) => {
    console.log("pressed device with id", deviceId);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Dashboard</Text>
        <Text>Accept Devices</Text>
        <Pressable onPress={() => handleAcceptDevice(12)}>
          <Text>Accept user</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
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
