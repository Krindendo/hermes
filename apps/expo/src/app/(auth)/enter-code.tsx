import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { router, Stack } from "expo-router";

export default function EnterCodeScreen() {
  const [code, onChangeCode] = React.useState("");

  const handleSubmit = async () => {
    const body = JSON.stringify({
      email: "marko@gmail.com",
      emailConfirmationCode: code,
    });
    console.log("body", body);
    try {
      const response = await fetch(
        "http://192.168.100.4:3001/api/auth/mobile/login-finale",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        },
      );
      const json = await response.json();
      console.log("json", json);

      if (json.accessToken) {
        router.replace("/dashboard/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <Text>Enter Code you recived in email</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeCode}
        value={code}
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
