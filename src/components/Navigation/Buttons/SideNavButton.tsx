import ProjectsButton from "./ProjectsButton";
import type { NavLinkType } from "@/types/navigation";

export const SideNavButton = ({
  name,
  action,
  icon,
  selected,
}: {
  name: string;
  action: () => void;
  icon?: JSX.Element;
  selected: boolean;
}) => {
  return (
    <>
      {/* {name === "Projects" ? (
        <ProjectsButton />
      ) : ( */}
      <button
        onClick={action}
        className={`
            ${
              selected
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }
            "group font-medium" flex w-full items-center gap-4  rounded-md px-2 py-2 text-sm
          `}
      >
        {icon}
        {name}
      </button>
      {/* )} */}
    </>
  );
};
