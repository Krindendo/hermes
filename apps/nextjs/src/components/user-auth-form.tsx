"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button, buttonVariants } from "@hermes/ui/components/button";
import { Icons } from "@hermes/ui/components/Icons";
import { Input } from "@hermes/ui/components/input";
import { Label } from "@hermes/ui/components/label";
import { cn } from "@hermes/ui/utils";

import { userAuthSchema } from "~/utils/validations/auth";

type FormData = z.infer<typeof userAuthSchema>;

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  function onSubmit(data: FormData) {
    console.log("submited data", data);
    setIsLoading(true);
  }

  return (
    <div
      className={cn(
        "mb-32 flex w-full flex-col items-center justify-center gap-3",
        className,
      )}
      {...props}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-xs flex-col text-center"
      >
        <Label className="sr-only" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          {...register("email")}
        />
        {errors?.email && (
          <p className="ml-2 self-start pt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
        <span className="h-3 w-full"></span>
        <Button className={cn(buttonVariants())} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Continue with Email
        </Button>
      </form>
      {isLoading && (
        <div>
          <p>Accept in your mobile application</p>
        </div>
      )}
    </div>
  );
}
