import { Text } from "react-native";
import { Redirect, Tabs } from "expo-router";

import { useSession } from "../../components/ctx";

export default function DashboardLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="access"
        options={{
          title: "Access",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
