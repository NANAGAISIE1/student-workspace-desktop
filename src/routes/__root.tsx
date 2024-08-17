import SearchDialog from "@/components/dialogs/search-command-dialog";
import WorkspaceHeader from "@/components/title-bar";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

export const Route = createRootRoute({
  component: () => (
    <main className="flex h-screen overflow-hidden w-full flex-col">
      <WorkspaceHeader />
      <Outlet />
      <Toaster
        richColors={true}
        icons={{
          loading: <Loader2Icon className="animate-spin" />,
        }}
      />
      <SearchDialog />
      {/* <Link to="/" className="[&.active]:font-bold">
          About
        </Link> */}
    </main>
  ),
});
