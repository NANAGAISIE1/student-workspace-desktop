import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/splashscreen")({
  component: () => <div>Hello /splashscreen!</div>,
});
