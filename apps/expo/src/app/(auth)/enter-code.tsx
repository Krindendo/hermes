import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";

export default function EnterCodeScreen() {
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
        <Text>Enter code</Text>
        <TextInput />

        <Pressable
          onPress={() => {
            router.replace("/dasboard/");
          }}
        >
          <Text>Sign in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
