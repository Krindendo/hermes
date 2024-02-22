import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";

import { useSession } from "~/components/ctx";

export default function LoginScreen() {
  const { signIn } = useSession();
  return (
    <SafeAreaView>
      {/* <Stack
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          title: "Home Page",
        }}
      /> */}
      <View>
        <Text>Login</Text>
        <TextInput />

        <Pressable
          onPress={() => {
            signIn();
            router.replace("/access");
          }}
        >
          <Text>Sign in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
