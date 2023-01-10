import useHomeViewStore from "@/store/home/view-store";
import ProjectsButton from "./ProjectsButton";
import {
  ServerStackIcon,
  UsersIcon,
  CalendarIcon,
  InboxIcon,
} from "@heroicons/react/20/solid";
import type { NavLinkType } from "@/types/navigation";

const iconStyles = "h-6 w-6";
const iconMap = {
  Servers: <ServerStackIcon className={iconStyles} />,
  Staff: <UsersIcon className={iconStyles} />,
  Calendar: <CalendarIcon className={iconStyles} />,
  Documents: <InboxIcon className={iconStyles} />,
  Projects: <InboxIcon className={iconStyles} />,
};

export const SideNavButton = ({ name }: { name: NavLinkType }) => {
  const v = useHomeViewStore();
  return (
    <>
      {name === "Projects" ? (
        <ProjectsButton />
      ) : (
        <button
          onClick={() => v.set(name)}
          className={`
            ${
              name === v.view
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }
            "group font-medium" flex w-full items-center gap-4  rounded-md px-2 py-2 text-sm
          `}
        >
          {iconMap[name]}
          {name}
        </button>
      )}
    </>
  );
};
