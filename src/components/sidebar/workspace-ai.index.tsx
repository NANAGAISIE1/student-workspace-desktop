import { useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

const WorkspaceAi = () => {
  const router = useRouter();
  return (
    <>
      <Button
        variant={"ghost"}
        size={"sm"}
        className="justify-start"
        onClick={() => router.navigate({ to: "/workspace-ai" })}
      >
        <Sparkles className="h-4 w-4 mr-2 text-vibrant-blue" />
        <p className="!mt-0">Workspace AI</p>
      </Button>
    </>
  );
};

export default WorkspaceAi;
