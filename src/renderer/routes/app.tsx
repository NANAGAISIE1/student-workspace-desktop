import Sidebar from "../components/sidebar";
import { motion } from "framer-motion";
import { useSidbarStore } from "../components/use-sidebar";
import Editor from "@renderer/components/editor";

export const App = () => {
  const { isSidebarOpen } = useSidbarStore((state) => state);

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <motion.main
        className="flex-1 overflow-auto h-full"
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
        <div className="w-full flex flex-col h-full space-y-3">
          <Editor />
        </div>
      </motion.main>
    </div>
  );
};
