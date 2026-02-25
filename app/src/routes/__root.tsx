import { ToggleTeam } from "@/components/ToggleTeam/ToggleTeam";
import { ToggleTheme } from "@/components/ToggleTheme/ToggleTheme";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => {
  return (
    <>
      <div className="p-2 flex gap-2 items-center justify-between bg-muted">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <div className="flex gap-2 items-center">
          <ToggleTeam />
          <ToggleTheme />
        </div>
      </div>
      <hr />
      <div className="p-12">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
