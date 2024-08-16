import Dashboard from "@/components/dashboard";
import EditorBanner from "@/components/editor-banner";
import ErrorBoundary from "@/components/error-boundary";
import Sidebar from "@/components/sidebar";
import { useSidebarStore } from "@/components/sidebar/use-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectedDocument } from "@/hooks/use-documents";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { isSidebarOpen } = useSidebarStore((state) => state);

  const { selectedDocument, isLoading } = useSelectedDocument();

  //   const handleChange = (value: Descendant[]) => {
  //     // Convert Slate's Descendant[] to a string or JSON for storage
  //     const content = JSON.stringify(value);
  //     // throttle(() => saveDocument(content), 1000, { leading: false, trailing: true });
  //     saveDocument(content);
  //   };

  // Parse the stored content back into Slate's format
  //   const initialValue = selectedDocument?.content
  //     ? JSON.parse(selectedDocument?.content)
  //     : [{ type: "paragraph", children: [{ text: "" }] }];

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
                  <Loader2Icon className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <>
                  <EditorBanner />
                  {/* <Editor
                    initialValue={initialValue}
                    handleChange={handleChange}
                    selectedDocument={selectedDocument}
                  /> */}
                </>
              )}
            </ScrollArea>
          )}
        </motion.main>
      </div>
    </ErrorBoundary>
  );
}
