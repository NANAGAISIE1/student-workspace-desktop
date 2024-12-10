import { ThemeProvider } from "@/components/providers/theme/theme-provider";
import { PropsWithChildren } from "react";

function MainProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="workspace-ui-theme">
      {children}
    </ThemeProvider>
  );
}

export default MainProviders;
