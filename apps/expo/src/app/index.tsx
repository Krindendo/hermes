import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";

import { useSession } from "~/components/ctx";

export default function LoginScreen() {
  const { signIn } = useSession();
  return (
    <SafeAreaView className="bg-slate-100">
      {/* <Stack
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          title: "Home Page",
        }}
      /> */}
      <View className="h-full w-full p-4">
        <Text>Login</Text>
        <TextInput />

        <Pressable
          className="rounded-lg bg-red-400 p-4"
          onPress={() => {
            signIn();
            router.replace("/access");
          }}
        >
          <Text className="text-center text-lg font-bold">Sign in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
