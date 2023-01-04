import { IWorkspace } from "@/types/types";
import { trpc } from "@/utils/trpc";
import { faHome, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import server from "pages/api/server";
import * as React from "react";
import { useEffect, useState } from "react";
import Stack from "../UI/Stack";
import Tile from "../UI/Tile";

interface IServerNavProps {
  setView: (view: string) => void;
  workspaces: IWorkspace[];
  openWorkspaceModal: () => void;
  setWorkspace: (workspace: IWorkspace) => void;
  serverId: string;
}

const ServerNav: React.FunctionComponent<IServerNavProps> = ({
  setView,
  workspaces,
  openWorkspaceModal,
  setWorkspace,
}) => {
  return (
    <Stack gap={4} className="justify-between bg-slate-900 p-2" center>
      <Stack gap={3} center>
        <Link href="/home">
          <FontAwesomeIcon icon={faHome} className="text-4xl text-slate-400" />
        </Link>
        <button onClick={() => setView("serverOptions")} className="group ">
          <FontAwesomeIcon
            icon={faGear}
            className="text-4xl text-slate-400 transition-transform duration-500  group-hover:rotate-180"
          />
        </button>
        <div className="h-0.5 w-full rounded bg-slate-400" />
        <Stack center gap={4}>
          {workspaces.map((workspace) => {
            return (
              <button
                onClick={() => {
                  // console.log("clicked workspace", workspace);
                  setWorkspace(workspace);
                }}
                key={workspace.id}
              >
                <Tile
                  src={workspace.image}
                  className="border border-slate-400 hover:border-indigo-600"
                  size="sm"
                />
              </button>
            );
          })}
        </Stack>
      </Stack>
      <button
        onClick={openWorkspaceModal}
        className="h-12 w-full rounded border border-slate-400"
      >
        <FontAwesomeIcon icon={faPlus} className="text-green-600" />
      </button>
    </Stack>
  );
};

export default ServerNav;
