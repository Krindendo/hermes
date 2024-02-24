import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { router, Stack } from "expo-router";

export default function LoginScreen() {
  const [email, onChangeEmail] = React.useState("");

  const handleSubmit = async () => {
    const body = JSON.stringify({ email });

    try {
      const response = await fetch(
        "http://192.168.100.4:3001/api/auth/mobile/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        },
      );
      const json = await response.json();
      console.log("json", json);

      if (json.message) {
        router.replace("/enter-code");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Text>Enter email</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      />

      <Pressable onPress={handleSubmit}>
        <Text>Sign in</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
