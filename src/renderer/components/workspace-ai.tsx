import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

type Props = {};

const WorkspaceAi = (props: Props) => {
  return (
    <>
      <Button variant={"ghost"} size={"sm"} className="justify-start">
        <Sparkles className="h-4 w-4 mr-2 text-vibrant-blue" />
        <p className="!mt-0">Workspace AI</p>
      </Button>
    </>
  );
};

export default WorkspaceAi;
