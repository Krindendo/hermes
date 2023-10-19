import { Separator } from "@hermes/ui/components/separator";

import { ProfileForm } from "~/app/(dashboard)/dashboard/profile/profile-form";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile settings. Set your email and username.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
