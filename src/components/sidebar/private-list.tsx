import React from "react";
import { MoreHorizontal, ScrollText } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useDocument } from "@/services/documents-service";
import { useUser } from "@/services/auth-servics";
import { cn } from "@/lib/utils";
import { useLocation, useRouter } from "@tanstack/react-router";

const PrivateList: React.FC = () => {
  const router = useRouter();
  const pathname = useLocation().pathname;
  const { getDocuments } = useDocument();
  const { user } = useUser();
  const documents = getDocuments();

  if (!user?._id) {
    return null;
  }

  return (
    <Collapsible>
      <CollapsibleTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "w-full justify-between",
        })}
      >
        <p className="!mt-0">Private</p>
        <MoreHorizontal className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full pr-2 pt-2">
        <ul className="list-none p-0 m-0 ml-2 w-full space-y-2">
          {documents?.map((document) => (
            <li key={document._id} className="w-full">
              <Button
                className={cn(
                  "w-full justify-start ",
                  pathname === `/index/${document._id}`
                    ? "bg-accent text-accent-foreground"
                    : "",
                )}
                variant="ghost"
                size="sm"
                onClick={() =>
                  router.navigate({
                    to: "/index/$",
                    params: { _splat: document._id },
                  })
                }
              >
                {document.emoji ? (
                  <span>{document.emoji}</span>
                ) : (
                  <ScrollText className="h-4 w-4 mr-2" />
                )}
                <p className="!mt-0">{document.title}</p>
              </Button>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PrivateList;
