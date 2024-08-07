import { MoreHorizontal, User } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useDocuments } from "@renderer/hooks/use-documents.js";

const PrivateList = () => {
  const { documents, isLoading, error, handleDocumentSelect } = useDocuments();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      <CollapsibleContent className="w-full">
        <ul className="list-none p-0 m-0 ml-2 w-full">
          {documents?.map((document, index) => (
            <li key={document.title} className="w-full">
              <Button
                className="justify-start w-full"
                variant={"ghost"}
                size={"sm"}
                onClick={() => handleDocumentSelect(index)}
              >
                <User className="h-4 w-4 mr-2" />
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
