import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, Stack } from "expo-router";

import { useSession } from "~/components/ctx";

export default function LoginScreen() {
  const { signIn } = useSession();
  return (
    <SafeAreaView className="bg-slate-100">
      <Stack
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          title: "Home Page",
        }}
      />
      <View className="h-full w-full p-4">
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
