import { PasswordRegistrationCard } from "@/components/auth/register";
import { buttonVariants } from "@/components/shadcn-ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(auth)/register")({
  component: () => <Register />,
});

const Register = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <PasswordRegistrationCard />
      <div className="flex items-center justify-center">
        <p className="mr-2">Have an account?</p>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "!m-0 !p-0",
          })}
          to={"/login"}
        >
          Sign in instead
        </Link>
      </div>
    </main>
  );
};
