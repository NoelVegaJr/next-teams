import type { Project } from "@prisma/client";
import create from "zustand";

interface ITask {
  id: string;
  name: string;
}

interface ITaskList {
  id: string;
  name: string;
  tasks: ITask[];
}

interface ITaskboard {
  id: string;
  name: string;
  TaskLists: ITaskList[];
}

interface IProject {
  id: string;
  name: string;
  contributors: { profileId: string }[];
  taskboard: ITaskboard;
  conversation: {
    id: string;
    participants: { profileId: string; id: string }[];
    messages: {
      id: string;
      date: Date;
      participant: { profileId: string; id: string };
      text: string;
    }[];
  };
}

type projectMap = Record<string, IProject>;

interface projectStore {
  currentProjectId: string;
  projects: projectMap;
  set: (project: IProject) => void;
  setCurrentProjectId: (id: string) => void;
}

const useProjectsStore = create<projectStore>()((set) => ({
  projects: {},
  currentProjectId: "",
  set: (project) => {
    set((state) => {
      state.projects[project.id] = project;
      return { projects: state.projects };
    });
  },
  setCurrentProjectId: (id) => {
    set(() => {
      return { currentProjectId: id };
    });
  },
}));

export default useProjectsStore;
