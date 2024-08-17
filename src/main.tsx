import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import { store } from "./store/session-store";
import { ConvexQueryCacheProvider } from "convex-helpers/react/cache/provider";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const replaceURL = (relativeUrl: string) => {
  router.history.replace(relativeUrl);
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ConvexAuthProvider
        client={convex}
        storage={store}
        replaceURL={replaceURL}
      >
        <ConvexQueryCacheProvider>
          <ThemeProvider defaultTheme="system" storageKey="st-ui-theme">
            <RouterProvider router={router} />
          </ThemeProvider>
        </ConvexQueryCacheProvider>
      </ConvexAuthProvider>
    </StrictMode>,
  );
}
