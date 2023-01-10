import useHomeViewStore from "@/store/home/view-store";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import ExpandButton from "./ExpandButton";

const ProjectsButton: React.FunctionComponent = () => {
  const view = useHomeViewStore();
  return (
    <ExpandButton
      title="Projects"
      onClick={() => view.set("Projects")}
      button={
        <div
          className={`
            ${
              view.view === "Projects"
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }
            "group font-medium" flex w-full items-center gap-4  rounded-md px-2 py-2 text-sm
          `}
        >
          <div
            className={`
            ${
              "Projects" === view.view
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }
            group flex   items-center  gap-4 rounded-md  text-sm font-medium
          `}
          >
            <ChartBarIcon className="h-6 w-6" />
          </div>
          Projects
        </div>
      }
    >
      {["Chase", "SpaceX", "Apple", "Uber"].map((project) => {
        return (
          <button
            onClick={() => view.set("Client")}
            key={project}
            className="w-full rounded py-1 pl-6 text-left text-gray-400 hover:bg-indigo-700 hover:text-gray-200"
          >
            {project}
          </button>
        );
      })}
    </ExpandButton>
  );
};

export default ProjectsButton;
