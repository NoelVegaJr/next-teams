import useHomeViewStore from "@/store/home/view-store";
import { SideNavButton } from "../Buttons/SideNavButton";
import type { NavLinkType } from "@/types/navigation";
import {
  CalendarIcon,
  InboxIcon,
  ServerStackIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import ProjectsButton from "../Buttons/ProjectsButton";

const views: NavLinkType[] = [
  "Servers",
  "Staff",
  "Projects",
  "Documents",
  "Calendar",
];

const iconMap: Record<string, JSX.Element> = {
  Servers: <ServerStackIcon className="h-6 w-6" />,
  Staff: <UsersIcon className="h-6 w-6" />,
  Calendar: <CalendarIcon className="h-6 w-6" />,
  Documents: <InboxIcon className="h-6 w-6" />,
  Projects: <InboxIcon className="h-6 w-6" />,
};
export const DesktopSideNavigation = () => {
  const v = useHomeViewStore();

  return (
    <nav className="mt-5 flex-1 space-y-1 px-2">
      {views.map((view) => {
        if (view === "Projects") {
          return <ProjectsButton key={view} />;
        }
        return (
          <SideNavButton
            key={view}
            name={view}
            action={() => v.set(view)}
            icon={iconMap[view]}
            selected={v.view === view}
          />
        );
      })}
    </nav>
  );
};

export default DesktopSideNavigation;
