import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { Toaster } from "./components/ui/sonner";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { LoginPage } from "./routes/login";
import OnboardingPage from "./routes/onboarding";
import { ThemeProvider } from "./components/theme-provider";
import WindowTitlebar from "./components/title-bar";
import { SignupPage } from "./routes/signup";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import App from "./routes/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Amplify.configure(outputs);

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
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
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
