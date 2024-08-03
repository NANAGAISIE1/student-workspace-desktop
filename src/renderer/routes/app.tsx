import Sidebar from "../components/sidebar";
import { motion } from "framer-motion";
import { useSidbarStore } from "../components/use-sidebar";
import Editor from "@renderer/components/editor";
import EditorBanner from "@renderer/components/editor-banner";
import { ScrollArea } from "@renderer/components/ui/scroll-area";
// import { ipcRenderer } from "electron";

export const App = () => {
  const { isSidebarOpen } = useSidbarStore((state) => state);

  const fetchTodos = async () => {
    const todos = await window.electron.fetchTodos();
    console.log(todos);
    return todos;
  };

  fetchTodos();

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <motion.main
        className="flex-1 h-full overflow-hidden"
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
        <ScrollArea className="w-full flex flex-col h-full space-y-3">
          <EditorBanner />
          <Editor />
        </ScrollArea>
      </motion.main>
    </div>
  );
};
