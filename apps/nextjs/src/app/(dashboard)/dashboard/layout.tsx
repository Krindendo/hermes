import { SiteFooter } from "~/components/site-footer";
import { SiteNav } from "~/components/site-nav";
import { UserAccountNav } from "~/components/user-account-nav";
import { dashboardConfig } from "~/config/dashboard";
import type { User } from "~/types/user";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const user: User = {
    name: "Krindendo",
    email: "me@example.com",
  };

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <SiteNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
