import { ThemeProvider } from "@/components/providers/theme/theme-provider";
import { PropsWithChildren } from "react";
import { Toaster } from "../ui/sonner";

function MainProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="workspace-ui-theme">
      {children}
      <Toaster />
    </ThemeProvider>
  );
}

export default MainProviders;
