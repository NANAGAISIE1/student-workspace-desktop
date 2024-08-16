import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { Toaster } from "./components/ui/sonner";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import WindowTitlebar from "./components/title-bar";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import SearchDialog from "./components/dialogs/search-command-dialog";

Amplify.configure(outputs);

const Home = lazy(() => import("./routes/home"));
const LoginPage = lazy(() => import("./routes/login"));
const SignupPage = lazy(() => import("./routes/signup"));
const OnboardingPage = lazy(() => import("./routes/onboarding"));

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="w-full items-center justify-center flex h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense
        fallback={
          <div className="w-full items-center justify-center flex h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <LoginPage />,
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense
        fallback={
          <div className="w-full items-center justify-center flex h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <SignupPage />,
      </Suspense>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <Suspense
        fallback={
          <div className="w-full items-center justify-center flex h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <OnboardingPage />,
      </Suspense>
    ),
  },
]);

// Create a client
const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  // const theme = window.electron.getTheme();
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={"system"} storageKey="sw-theme">
          <main className="w-full h-screen relative overflow-hidden">
            <div className="top-0 inset-x-0 bg-background-dark fixed">
              <WindowTitlebar />
            </div>
            <div className="w-full h-full pt-10 overflow-hidden">
              <RouterProvider router={router} />
            </div>
            <Toaster richColors={true} />
            <SearchDialog />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
