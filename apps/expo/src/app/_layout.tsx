import React from "react";
import { Text, View } from "react-native";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <View>
      {/* <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#cae3f1",
          },
        }}
      /> */}
      <Slot />
      <StatusBar />
    </View>
  );
};

export default RootLayout;
