import { Plate } from "@udecode/plate-common";
import { CommentsProvider } from "@udecode/plate-comments";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CommentsPopover } from "@renderer/components/plate-ui/comments-popover";
import { Editor as PlateEditor } from "@renderer/components/plate-ui/editor";
import { FloatingToolbar } from "@renderer/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@renderer/components/plate-ui/floating-toolbar-buttons";
import { TooltipProvider } from "@renderer/components/plate-ui/tooltip";
import { CursorOverlay } from "@renderer/components/plate-ui/cursor-overlay";
import { plugins } from "./plugin";
import { useRef } from "react";
import { MENTIONABLES } from "@renderer/lib/plate/mentionables";
import { MentionCombobox } from "../plate-ui/mention-combobox";
import { commentsUsers, myUserId } from "@renderer/lib/plate/comments";
import { Descendant } from "slate";

export default function Editor({
  initialValue,
  selectedDocument,
  handleChange,
}: {
  initialValue: any;
  handleChange: (value: Descendant[]) => void;
  selectedDocument: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={commentsUsers} myUserId={myUserId}>
          <Plate
            plugins={plugins}
            initialValue={initialValue}
            value={initialValue}
            id={selectedDocument?.title}
            onChange={handleChange}
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

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}
