import { motion } from "framer-motion";
import {
  Home,
  Inbox,
  LayersIcon,
  LayoutTemplate,
  PanelLeftClose,
  Trash2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { UserProfileMenu } from "./dropdown-menu";
import { SearchDialogComponent } from "../search-dialog";
import WorkspaceAi from "../workspace-ai";
import { Separator } from "../ui/separator";
import FavoritesList from "../favorites-list";
import SharedList from "../shared-list";
import PrivateList from "../private-list";
import { useSidbarStore } from "../use-sidebar";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidbarStore((state) => state);

  const sidebarVariants = {
    open: { width: "15rem", x: 0 },
    closed: { width: "0", x: "-15rem" },
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
        className="fixed top-0 left-0 h-screen border-r bg-background flex flex-col p-3 space-y-2 overflow-hidden"
      >
        <div className="flex justify-between">
          <Button size={"icon"} variant={"ghost"}>
            <LayersIcon className="w-4 h-4" />
          </Button>
          <Button size={"icon"} variant={"ghost"} onClick={toggleSidebar}>
            <PanelLeftClose className="w-4 h-4" />
          </Button>
        </div>
        {/* Rest of the sidebar content */}
        <div className="flex flex-col space-y-2">
          <UserProfileMenu />
          <SearchDialogComponent />
          <WorkspaceAi />
          <Button className="justify-start" variant={"ghost"} size={"sm"}>
            <Home className="h-4 w-4 mr-2" />
            <p className="!mt-0">Home</p>
          </Button>
          <Button className="justify-start" variant={"ghost"} size={"sm"}>
            <Inbox className="h-4 w-4 mr-2" />
            <p className="!mt-0">Inbox</p>
          </Button>
        </div>
        <Separator />
        <div className="h-full justify-start overflow-y-auto flex flex-col w-full overflow-x-clip">
          <FavoritesList />
          <SharedList />
          <PrivateList />
        </div>
        <div className="flex flex-col space-y-2">
          <Button className="justify-start" variant={"ghost"} size={"sm"}>
            <LayoutTemplate className="h-4 w-4 mr-2" />
            <p className="!mt-0">Template</p>
          </Button>
          <Button className="justify-start" variant={"ghost"} size={"sm"}>
            <Trash2Icon className="h-4 w-4 mr-2" />
            <p className="!mt-0">Trash</p>
          </Button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
