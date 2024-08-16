import Sidebar from "../components/sidebar";
import { motion } from "framer-motion";
import Editor from "@renderer/components/editor";
import EditorBanner from "@renderer/components/editor-banner";
import { ScrollArea } from "@renderer/components/ui/scroll-area";
import ErrorBoundary from "@renderer/components/error-boundary";
import { useSelectedDocument } from "@renderer/hooks/use-documents";
import { Descendant } from "slate";
import { Loader2 } from "lucide-react";
import Dashboard from "@renderer/components/dashboard";
import { useSidebarStore } from "@renderer/components/sidebar/use-sidebar";
import { useEffect } from "react";

const Home: React.FC = () => {
  const { isSidebarOpen, ensureOpen } = useSidebarStore((state) => state);

  useEffect(() => {
    ensureOpen();
  }, []);

  const { selectedDocument, isLoading, saveDocument } = useSelectedDocument();

  const handleChange = (value: Descendant[]) => {
    // Convert Slate's Descendant[] to a string or JSON for storage
    const content = JSON.stringify(value);
    // throttle(() => saveDocument(content), 1000, { leading: false, trailing: true });
    saveDocument(content);
  };

  // Parse the stored content back into Slate's format
  const initialValue = selectedDocument?.content
    ? JSON.parse(selectedDocument?.content)
    : [{ type: "paragraph", children: [{ text: "" }] }];

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
          {!selectedDocument ? (
            <Dashboard />
          ) : (
            <ScrollArea className="w-full flex flex-col h-full space-y-3">
              {isLoading ? (
                <div className="w-full items-center justify-center flex">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <>
                  <EditorBanner />
                  <Editor
                    initialValue={initialValue}
                    handleChange={handleChange}
                    selectedDocument={selectedDocument}
                  />
                </>
              )}
            </ScrollArea>
          )}
        </motion.main>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
