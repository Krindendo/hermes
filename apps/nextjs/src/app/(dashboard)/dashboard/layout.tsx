import { SiteHeader } from "~/components/site-header";
import { marketingConfig } from "~/config/marketing";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <SiteHeader items={marketingConfig.mainNav} />
      {children}
    </div>
  );
}
