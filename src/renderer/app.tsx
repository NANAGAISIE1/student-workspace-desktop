import { ThemeProvider } from "./components/theme-provider";
import Sidebar from "./components/sidebar";
import { motion } from "framer-motion";
import { ModeToggle } from "./components/mode-toggle";
import { Separator } from "./components/ui/separator";
import WindowTitlebar from "./components/title-bar";
import { useSidbarStore } from "./components/use-sidebar";

export const App = () => {
  const { isSidebarOpen } = useSidbarStore((state) => state);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="sw-theme">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <motion.main
          className="flex-1 overflow-auto"
          initial={false}
          animate={{
            marginLeft: isSidebarOpen ? "15rem" : "0",
            width: isSidebarOpen ? "calc(100% - 15rem)" : "100%",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 400,
            damping: 40,
          }}
        >
          <div className="w-full flex flex-col">
            <WindowTitlebar />
            <Separator className="w-full bg-background-lighter" />
            <div className="flex flex-col justify-center px-6 items-center">
              <h1>Electron wow</h1>
              <ModeToggle />
            </div>
          </div>
        </motion.main>
      </div>
    </ThemeProvider>
  );
};
