import { SidebarInset } from "@/components/ui/sidebar";
import WorkareaHeader from "./header";
import Workpage from "./workpage";

const Workarea = () => {
  return (
    <SidebarInset>
      <WorkareaHeader />
      <Workpage />
    </SidebarInset>
  );
};

export default Workarea;
