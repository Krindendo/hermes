import type { ComponentProps } from "react";

export function SignIn({ ...props }: ComponentProps<"button">) {
  return (
    <form action={`/api/auth/signin`} method="post">
      <button {...props} />
    </form>
  );
}

export function SignOut(props: ComponentProps<"button">) {
  return (
    <form action="/api/auth/signout" method="post">
      <button {...props} />
    </form>
  );
}
