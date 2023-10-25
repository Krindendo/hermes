import { Tabs } from "expo-router";

export default function DashboardLayout() {
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
