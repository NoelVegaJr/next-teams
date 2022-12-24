import { createContext, useState } from "react";

interface IWorkspace {
  id: number;
  name: string;
  image: string;
}

interface IWorkspaceContext {
  workspace: IWorkspace;
  set: (workspace: IWorkspace) => void;
}

const workspaces = [
  { id: 1, name: "Adidas", image: "/adidas.png" },
  { id: 2, name: "Prima Pizza", image: "/prima.jfif" },
  { id: 3, name: "Google", image: "/google.png" },
];

export const WorkspaceContext = createContext<IWorkspaceContext | null>(null);

const WorkspaceProvider = ({ children }: { children: JSX.Element }) => {
  const [workspace, setWorkspace] = useState(workspaces[0]);
  console.log(workspace);

  const changeWorkspace = (workspace: IWorkspace) => {
    console.log("changing workspace");
    setWorkspace(workspace);
  };
  return (
    <WorkspaceContext.Provider value={{ workspace, set: changeWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;
