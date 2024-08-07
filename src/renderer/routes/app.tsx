import Sidebar from "../components/sidebar";
import { motion } from "framer-motion";
import { useSidbarStore } from "../components/use-sidebar";
import Editor from "@renderer/components/editor";
import EditorBanner from "@renderer/components/editor-banner";
import { ScrollArea } from "@renderer/components/ui/scroll-area";
import { toast } from "sonner";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import ErrorBoundary from "@renderer/components/error-boundary";

interface User {
  userId: string;
}

export const App: React.FC = () => {
  const { isSidebarOpen } = useSidbarStore((state) => state);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { userId: id } = (await getCurrentUser()) as User;
        setUserId(id);
        toast.success(`You are logged in: ${id}`);
      } catch (error) {
        console.error(error);
        toast.warning("You are not logged in");
      }
    };

    fetchUser();
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default App;
