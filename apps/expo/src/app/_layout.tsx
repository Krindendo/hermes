import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { SessionProvider } from "~/components/ctx";
import { TRPCProvider } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <TRPCProvider>
      <SessionProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#cae3f1",
            },
          }}
        />
        <StatusBar />
      </SessionProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
