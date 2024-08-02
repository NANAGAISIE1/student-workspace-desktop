import { MoreHorizontal, User } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

type Props = {};

const PrivateList = (props: Props) => {
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
          <li className="w-full">
            <Button
              className="justify-start w-full"
              variant={"ghost"}
              size={"sm"}
            >
              <User className="h-4 w-4 mr-2" />
              <p className="!mt-0">Document</p>
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="justify-start w-full"
              variant={"ghost"}
              size={"sm"}
            >
              <User className="h-4 w-4 mr-2" />
              <p className="!mt-0">Document</p>
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="justify-start w-full"
              variant={"ghost"}
              size={"sm"}
            >
              <User className="h-4 w-4 mr-2" />
              <p className="!mt-0">Document</p>
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="justify-start w-full"
              variant={"ghost"}
              size={"sm"}
            >
              <User className="h-4 w-4 mr-2" />
              <p className="!mt-0">Document</p>
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="justify-start w-full"
              variant={"ghost"}
              size={"sm"}
            >
              <User className="h-4 w-4 mr-2" />
              <p className="!mt-0">Document</p>
            </Button>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PrivateList;
