import { SidebarInset } from "@/components/ui/sidebar";
import WorkareaHeader from "./header";
import Workpage from "./workpage";

type Props = {};

const Workarea = (props: Props) => {
  return (
    <SidebarInset>
      <WorkareaHeader />
      <Workpage />
    </SidebarInset>
  );
};

export default Workarea;
