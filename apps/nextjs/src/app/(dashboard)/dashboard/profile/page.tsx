import { ProfileForm } from "~/app/(dashboard)/dashboard/profile/profile-form";
import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/dashboard-shell";

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Update your profile settings. Set your email and username."
      />
      <ProfileForm />
    </DashboardShell>
  );
}
