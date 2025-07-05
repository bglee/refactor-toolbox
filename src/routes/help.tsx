import { createFileRoute } from "@tanstack/react-router";
import { Help } from "../views/Help";

export const Route = createFileRoute("/help")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Help />;
}
