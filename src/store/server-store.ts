import type { IServer, IWorkspace } from "@/types/types";
import create from "zustand";

interface server {
  server: IServer;
  activeWorkspace: IWorkspace;
  setServer: (server: IServer) => void;
  setWorkspaces: (workspaces: IWorkspace[]) => void;
  setActiveWorkspace: (workspace: IWorkspace) => void;
}

const useServerStore = create<server>()((set) => ({
  server: {
    id: "",
    createdAt: new Date(),
    name: "",
    image: "",
    _count: {
      members: 0,
      workspaces: 0,
    },
    workspaces: [],
  },
  activeWorkspace: {
    channels: [],
    _count: {
      channels: 0,
      members: 0,
    },
    createdAt: new Date(),
    id: "",
    image: "",
    name: "",
    serverId: "",
  },
  setServer: (server: IServer) => {
    set((state) => ({ server }));
  },
  setWorkspaces: (workspaces: IWorkspace[]) => {
    set((state) => ({
      server: { ...state.server, workspaces },
    }));
  },
  setActiveWorkspace: (workspace: IWorkspace) => {
    set((state) => ({
      activeWorkspace: workspace,
    }));
  },
}));

export default useServerStore;
