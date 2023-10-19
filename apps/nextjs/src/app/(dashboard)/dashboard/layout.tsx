import { DashboardHeader } from "~/components/dashboard-header";
import { SiteFooter } from "~/components/site-footer";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
