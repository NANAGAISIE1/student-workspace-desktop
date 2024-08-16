import { SignupForm } from "@renderer/components/auth/signup-from";
import { useSidebarStore } from "@renderer/components/sidebar/use-sidebar";
import { buttonVariants } from "@renderer/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);

  useEffect(() => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  });
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <SignupForm />
      <Link to={"/onboarding"} className={buttonVariants({ variant: "link" })}>
        Continue without account
      </Link>
    </main>
  );
}

export default SignupPage;
