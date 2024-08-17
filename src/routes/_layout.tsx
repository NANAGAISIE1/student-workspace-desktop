import ErrorBoundary from "@/components/error-boundary";
import Sidebar from "@/components/sidebar";
import WorkspaceWrapper from "@/components/workspace-wrapper";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: () => (
    <ErrorBoundary>
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <WorkspaceWrapper>
          <Outlet />
        </WorkspaceWrapper>
      </div>
    </ErrorBoundary>
  ),
});
