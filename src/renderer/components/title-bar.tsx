import React from "react";
import { LayersIcon, Minus, PanelLeftOpen, Square, X } from "lucide-react";
import { Button } from "./ui/button";
import { useSidbarStore } from "./use-sidebar";
import { ModeToggle } from "./mode-toggle";
import { motion } from "framer-motion";

const WindowTitlebar: React.FC = () => {
  const handleMinimize = () => {
    window.electron.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electron.maximizeWindow();
  };

  const handleClose = () => {
    window.electron.closeWindow();
  };

  const { isSidebarOpen, toggleSidebar } = useSidbarStore((state) => state);

  return (
    <motion.header
      className="w-full items-center flex justify-between p-3 h-10 flex-1 relative"
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
      <div className="flex items-center justify-center space-x-1">
        {!isSidebarOpen && (
          <div className="flex items-center">
            <>
              <Button size={"icon"} variant={"ghost"}>
                <LayersIcon className="w-4 h-4" />
              </Button>
              <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
                <PanelLeftOpen className="w-4 h-4" />
              </Button>
            </>
          </div>
        )}
        <ModeToggle />
      </div>
      <div className="flex items-center fixed top-0 right-0 pr-3">
        <Button size="icon" variant="ghost" onClick={handleMinimize}>
          <Minus className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleMaximize}>
          <Square className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </motion.header>
  );
};

export default WindowTitlebar;
