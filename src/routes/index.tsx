import DB from "@/db/db";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: () => (
    <Suspense
      fallback={
        <div className="w-full h-full items-center justify-center flex flex-col">
          <Loader2Icon className="w-8 h-8 animate-spin" />
          <p>Loading workspace</p>
        </div>
      }
    >
      <Index />
    </Suspense>
  ),
  beforeLoad: async () => {
    const isAuthenticated = await DB.auth.isAuthenticated();
    try {
      if (!isAuthenticated) {
        const users = await DB.users.list();
        if (users.length > 0) {
          throw redirect({ to: "/login", replace: true });
        }
        throw redirect({ to: "/register", replace: true });
      }
    } catch (error) {
      console.error("Error in beforeLoad:", error);
    }
  },
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await DB.auth.isAuthenticated();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
