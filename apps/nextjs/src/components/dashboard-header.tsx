import { NavUser } from "./nav-user";

export function DashboardHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mx-6"></div>
        <div className="ml-auto flex items-center space-x-4">
          <NavUser />
        </div>
      </div>
    </div>
  );
}
