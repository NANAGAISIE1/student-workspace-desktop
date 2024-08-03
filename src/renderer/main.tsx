import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { App } from "./routes/app";
import { Toaster } from "./components/ui/sonner";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { LoginPage } from "./routes/login";
import OnboardingPage from "./routes/onboarding";
import { ThemeProvider } from "./components/theme-provider";
import WindowTitlebar from "./components/title-bar";

Amplify.configure(outputs, { ssr: false });

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
]);

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  // const theme = window.electron.getTheme();
  root.render(
    <StrictMode>
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
    </StrictMode>,
  );
}
