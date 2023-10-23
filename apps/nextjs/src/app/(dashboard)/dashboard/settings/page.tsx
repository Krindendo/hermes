import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/dashboard-shell";
import { SettingsForm } from "./setting-form";

export default function SettingPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Update your profile settings. Set your email and username."
      />
      <SettingsForm />
    </DashboardShell>
  );
}
