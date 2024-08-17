"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSidebarStore } from "./sidebar/use-sidebar";

const WorkspaceWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebarStore((state) => state);
  return (
    <motion.main
      className="flex-1 h-full overflow-hidden mt-10"
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
      {children}
    </motion.main>
  );
};

export default WorkspaceWrapper;
