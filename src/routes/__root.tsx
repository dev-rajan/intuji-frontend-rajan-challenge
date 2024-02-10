import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import SidebarLayout from "@src/components/Layout/SidebarLayout";

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
