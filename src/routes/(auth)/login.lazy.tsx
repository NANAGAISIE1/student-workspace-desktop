import { SignInCard } from "@/components/auth/login-card";
import { buttonVariants } from "@/components/shadcn-ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(auth)/login")({
  component: () => <Login />,
});

export const Login = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <SignInCard />
      <div className="flex items-center justify-center">
        <p className="mr-2">Don&apos;t have an account?</p>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "!m-0 !p-0",
          })}
          to={"/register"}
        >
          Create account
        </Link>
      </div>
    </main>
  );
};
