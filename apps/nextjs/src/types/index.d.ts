import type { Icons } from "~/components/icons";

export type NavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem[];
    }
);

export interface MainNavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export type SidebarNavItem = NavItem;

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
  };
}

export interface MarketingConfig {
  mainNav: MainNavItem[];
}

export interface DashboardConfig {
  mainNav: MainNavItem[];
  //sidebarNav: SidebarNavItem[];
}
