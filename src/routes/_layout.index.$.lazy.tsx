import Editor from "@/components/editor";
import { Id } from "@convex/dataModel";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/index/$")({
  component: () => <Document />,
});

const Document = () => {
  const { _splat } = Route.useParams();
  const id = _splat as Id<"documents">;
  return (
    <div className="w-full h-full">
      <Editor id={id} />
    </div>
  );
};
