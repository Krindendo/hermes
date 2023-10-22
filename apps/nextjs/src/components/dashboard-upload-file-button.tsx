"use client";

import * as React from "react";

import type { ButtonProps } from "@hermes/ui/components/button";
import { buttonVariants } from "@hermes/ui/components/button";
import { cn } from "@hermes/ui/utils";

type DashboardUploadFileButtonProps = ButtonProps;

export function DashboardUploadFileButton({
  className,
  variant,
  ...props
}: DashboardUploadFileButtonProps) {
  function handleClick() {
    console.log("open model to upload file");
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant }),

        className,
      )}
      {...props}
    >
      Upload file
    </button>
  );
}
