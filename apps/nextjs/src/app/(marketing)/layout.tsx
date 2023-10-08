import Link from "next/link";

import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { marketingConfig } from "~/config/marketing";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <SiteHeader items={marketingConfig.mainNav} />
          <nav>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
