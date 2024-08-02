import React from "react";
import { LayersIcon, Minus, PanelLeftOpen, Square, X } from "lucide-react";
import { Button } from "./ui/button";
import { useSidbarStore } from "./use-sidebar";

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
    <>
      <header className="w-full items-center flex justify-between p-3">
        <div className="flex items-center">
          {!isSidebarOpen && (
            <>
              <Button size={"icon"} variant={"ghost"}>
                <LayersIcon className="w-4 h-4" />
              </Button>
              <Button size={"sm"} variant={"ghost"} onClick={toggleSidebar}>
                <PanelLeftOpen className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center">
          <Button size="sm" variant="ghost" onClick={handleMinimize}>
            <Minus className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleMaximize}>
            <Square className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </header>
    </>
  );
};

export default WindowTitlebar;
