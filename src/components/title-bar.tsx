"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  LayersIcon,
  MinusIcon,
  PanelLeftOpen,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSidebarStore } from "./sidebar/use-sidebar";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const WorkspaceHeader = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);
  const appWindow = getCurrentWindow();
  const location = useLocation();
  const pathname = location.pathname;
  const publicRoutes = ["/login", "/register", "/onboarding"];

  return (
    <motion.header
      className="w-full items-center flex justify-between h-10 flex-1 fixed inset-x-0 top-0"
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
      <div
        className="absolute inset-0"
        onMouseDown={() => appWindow.startDragging()}
      />
      <div className="flex items-center justify-center space-x-1 z-10">
        {!isSidebarOpen && (
          <div className="flex items-center">
            <>
              <Button size={"icon"} variant={"ghost"} onClick={() => {}}>
                <LayersIcon className="w-4 h-4" />
              </Button>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={toggleSidebar}
                className={cn(
                  publicRoutes.includes(pathname) ? "hidden" : "flex",
                )}
              >
                <PanelLeftOpen className="w-4 h-4" />
              </Button>
            </>
          </div>
        )}
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center space-x-1 z-10">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => appWindow.minimize()}
        >
          <MinusIcon className="w-4 h-4" />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => appWindow.toggleMaximize()}
        >
          <SquareIcon className="w-4 h-4" />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="hover:bg-danger hover:text-danger-foreground"
          onClick={() => appWindow.close()}
        >
          <XIcon className="w-4 h-4" />
        </Button>
      </div>
    </motion.header>
  );
};

export default WorkspaceHeader;
