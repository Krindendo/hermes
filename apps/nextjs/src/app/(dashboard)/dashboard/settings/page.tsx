import { Separator } from "@hermes/ui/components/separator";

import { SettingsForm } from "./setting-form";

export default function SettingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile settings. Set your email and username.
        </p>
      </div>
      <Separator />
      <SettingsForm />
    </div>
  );
}
