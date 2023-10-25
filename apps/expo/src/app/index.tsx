import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Stack } from "expo-router/stack";

export default function LoginScreen() {
  return (
    <SafeAreaView className="bg-slate-100">
      <Stack screenOptions={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text>Login</Text>
        <TextInput />
        <Link href="/access" asChild>
          <Pressable>
            <Text>Sign in</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
