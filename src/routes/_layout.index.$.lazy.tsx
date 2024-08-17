import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/index/$")({
  component: () => <Document />,
});

const Document = () => {
  const { _splat } = Route.useParams();
  const id = _splat;
  return (
    <div>
      <p>Document with id: {id}</p>
    </div>
  );
};
