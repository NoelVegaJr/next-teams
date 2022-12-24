import { useContext } from "react";
import Image from "next/image";
import { WorkspaceContext } from "../context/workspace-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IWorkspace {
  id: number;
  name: string;
  image: string;
}

const workspaces: IWorkspace[] = [
  { id: 1, name: "Adidas", image: "/adidas.png" },
  { id: 2, name: "Prima Pizza", image: "/prima.jfif" },
  { id: 3, name: "Google", image: "/google.png" },
  { id: 4, name: "Dunder Mifflin", image: "/dundermifflin.png" },
];

const WorkspaceList: React.FunctionComponent = () => {
  const workspaceCtx = useContext(WorkspaceContext);
  return (
    <div className="flex h-full flex-col items-center justify-center bg-slate-600 p-4">
      <ul className="flex h-full flex-1 flex-col items-center gap-4  ">
        {workspaces.map((workspace) => {
          return (
            <li
              onClick={() => workspaceCtx?.set(workspace)}
              key={workspace.id}
              className={`w-fit  rounded-lg  ${
                workspaceCtx?.workspace.id === workspace.id
                  ? "border-2 border-blue-500"
                  : "hover:border-2 hover:border-slate-400"
              }  p-0.5`}
            >
              <div className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-lg ">
                <Image
                  src={workspace.image}
                  alt="workspace"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </li>
          );
        })}
        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-800  bg-slate-500/80 shadow-2xl">
          <FontAwesomeIcon icon={faPlus} className="font-bold text-green-400" />
        </button>
      </ul>
    </div>
  );
};

export default WorkspaceList;
