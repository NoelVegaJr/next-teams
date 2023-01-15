import useCompanyStore from "@/store/company-store";
import useProjectStore from "@/store/home/project-store";
import useHomeViewStore from "@/store/home/view-store";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const ProjectsList: React.FunctionComponent = () => {
  const view = useHomeViewStore();
  const project = useProjectStore();
  const companyStore = useCompanyStore();
  const [selectedProject, setSelectedProject] = useState("");

  const clickHandler = (projectName: string, id: string) => {
    view.set("Project");
    setSelectedProject(projectName);
    project.setCurrentProjectId(id);
  };
  return (
    <>
      <div className="flex flex-col gap-1">
        {companyStore.projects.map((project) => {
          return (
            <button
              onClick={() => clickHandler(project.name, project.id)}
              key={project.id}
              className={`w-full rounded py-1 pl-6 text-left text-gray-400 ${
                selectedProject === project.name &&
                view.view === "Project" &&
                "bg-indigo-700 text-gray-200"
              } hover:bg-indigo-700 hover:text-gray-200`}
            >
              {project.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ProjectsList;
