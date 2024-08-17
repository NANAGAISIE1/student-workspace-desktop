import { Plate, TDescendant } from "@udecode/plate-common";
import { CommentsProvider } from "@udecode/plate-comments";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { Editor as PlateEditor } from "@/components/plate-ui/editor";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { plugins } from "./plugin";
import { useRef } from "react";
// import { MentionCombobox } from "../plate-ui/mention-combobox";
import { commentsUsers, myUserId } from "@/lib/plate/comments";
import { Id } from "@convex/dataModel";
import { useDocument } from "@/services/documents-service";

export default function Editor({ id }: { id: Id<"documents"> }) {
  const { getDocumentById, updateDocument } = useDocument();
  const document = getDocumentById(id);

  const content = document?.content
    ? JSON.parse(document.content)
    : [
        {
          id: "1",
          type: "h1",
          children: [{ text: "Hello, World!" }],
        },
      ];

  const saveDocument = async (value: TDescendant[]) => {
    if (!document) return;
    await updateDocument({ content: JSON.stringify(value), id });
    console.log("Document saved:", value);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={commentsUsers} myUserId={myUserId}>
          <Plate
            plugins={plugins}
            value={content}
            id={document?._id}
            onChange={saveDocument}
          >
            <PlateEditor
              variant={"ghost"}
              focusRing={false}
              spellCheck={true}
              autoFocus
              className="px-16 h-full flex-1 w-full bg-background-dark"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            {/* <MentionCombobox items={MENTIONABLES} /> */}

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}
