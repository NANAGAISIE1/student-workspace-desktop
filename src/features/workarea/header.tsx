import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumbs from "./breadcrumbs";
import { NavActions } from "./nav-actions";

const WorkareaHeader = () => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>
      {/* Current page actions */}
      <div className="ml-auto px-3">
        <NavActions />
      </div>
    </header>
  );
};

export default WorkareaHeader;
