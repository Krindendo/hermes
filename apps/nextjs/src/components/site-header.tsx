"use client";

import * as React from "react";

import type { MainNavItem } from "~/types";

interface SiteHeaderProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function SiteHeader({ items, children }: SiteHeaderProps) {
  console.log("items", items);
  return <div>{children}</div>;
}
