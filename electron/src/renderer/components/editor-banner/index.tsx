import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const EditorBanner = () => {
  return (
    <div className="aspect-[6/1] w-full">
      <Card className="w-full h-full rounded-none">
        <Skeleton className="w-full h-full" />
      </Card>
    </div>
  );
};

export default EditorBanner;
