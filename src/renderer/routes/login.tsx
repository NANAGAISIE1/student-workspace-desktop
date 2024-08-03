import { LoginForm } from "@renderer/components/auth/login-form";
import { buttonVariants } from "@renderer/components/ui/button";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <LoginForm />
      <Link to={"/onboarding"} className={buttonVariants({ variant: "link" })}>
        Continue without account
      </Link>
    </main>
  );
}
