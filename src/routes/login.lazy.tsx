import { LoginForm } from "@/components/auth/login-form";
import { buttonVariants } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: () => (
    <main className="flex justify-center items-center h-full flex-col">
      <LoginForm />
      <Link to={"/onboarding"} className={buttonVariants({ variant: "link" })}>
        Continue without account
      </Link>
    </main>
  ),
});
