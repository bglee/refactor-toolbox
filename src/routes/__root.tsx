import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeaderBar } from "../components/navigation/HeaderBar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeaderBar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
