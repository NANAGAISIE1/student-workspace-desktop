import { SignupForm } from "@/components/auth/signup-from";
import { buttonVariants } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/register")({
  component: () => (
    <main className="flex justify-center items-center h-full flex-col">
      <SignupForm />
      <Link to={"/onboarding"} className={buttonVariants({ variant: "link" })}>
        Continue without account
      </Link>
    </main>
  ),
});
