import { Toaster } from "@/components/shadcn-ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen antialiased">
      <Outlet />
      <Toaster
        richColors
        icons={{
          loading: <Loader2Icon className="animate-spin" />,
        }}
      />
    </div>
  ),
});
