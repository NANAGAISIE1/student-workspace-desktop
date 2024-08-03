import { Plate } from "@udecode/plate-common";
import { CommentsProvider } from "@udecode/plate-comments";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CommentsPopover } from "@renderer/components/plate-ui/comments-popover";
import { Editor as PlateEditor } from "@renderer/components/plate-ui/editor";
import { FloatingToolbar } from "@renderer/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@renderer/components/plate-ui/floating-toolbar-buttons";
import { TooltipProvider } from "@renderer/components/plate-ui/tooltip";
import EditorBanner from "../editor-banner";
import { plugins } from "./plugin";

const initialValue = [
  {
    id: "1",
    type: "h1",
    children: [{ text: "Hello, World!" }],
  },
];

export default function Editor() {
  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={{}} myUserId="1">
          <Plate plugins={plugins} initialValue={initialValue}>
            <EditorBanner />
            <PlateEditor
              variant={"ghost"}
              focusRing={false}
              spellCheck={true}
              className="bg-background-dark px-16 h-full flex-1 w-full"
            />
            {/* <InlineCombobox
            element={}
              showTrigger={true}
              trigger="/"
            >

              <InlineComboboxContent className="my-1.5">
                

               
              </InlineComboboxContent>
            </InlineCombobox> */}
            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}
