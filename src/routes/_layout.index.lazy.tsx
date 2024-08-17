import { useSidebarStore } from "@/components/sidebar/use-sidebar";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  const { ensureOpen } = useSidebarStore((state) => state);

  useEffect(() => {
    ensureOpen();
  }, []);

  // const { selectedDocument, isLoading } = useSelectedDocument();

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

  return <p>Hello from homepage</p>;
}
