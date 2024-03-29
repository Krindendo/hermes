import Link from "next/link";

import { buttonVariants } from "@hermes/ui/components/button";
import { cn } from "@hermes/ui/utils";

import { SiteFooter } from "~/components/site-footer";
import { SiteNav } from "~/components/site-nav";
import { marketingConfig } from "~/config/marketing";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="container flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <SiteNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

{
  /* <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link> */
}
