import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function AccessScreen() {
  const handleLogoutFromWeb = () => {
    console.log("logout from web");
  };
  const handleLogoutFromAllDevices = () => {
    console.log("logout from all");
  };
  return (
    <SafeAreaView>
      <Pressable onPress={handleLogoutFromWeb}>
        <Text>Sign out from web</Text>
      </Pressable>
      <Pressable onPress={handleLogoutFromAllDevices}>
        <Text>Sign out from all device</Text>
      </Pressable>
    </SafeAreaView>
  );
}
