import { UserAuthForm } from "~/components/user-auth-form";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-6">
      <UserAuthForm />
    </main>
  );
}
