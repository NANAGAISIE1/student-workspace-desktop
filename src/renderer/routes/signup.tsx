import { SignupForm } from "@renderer/components/auth/signup-from";
import { buttonVariants } from "@renderer/components/ui/button";
import { Link } from "react-router-dom";

export function SignupPage() {
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <SignupForm />
      <Link to={"/onboarding"} className={buttonVariants({ variant: "link" })}>
        Continue without account
      </Link>
    </main>
  );
}
