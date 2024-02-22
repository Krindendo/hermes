import { Pressable, Text, View } from "react-native";

export default function AccessScreen() {
  return (
    <View>
      <Text>Access</Text>
      <Pressable>
        <Text>Accept user</Text>
      </Pressable>

      <View>
        <Text>Sign out user from all device</Text>
        <Pressable>
          <Text>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}
