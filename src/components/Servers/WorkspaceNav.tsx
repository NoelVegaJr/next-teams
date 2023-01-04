import { IChannel, IWorkspace } from "@/types/types";
import { trpc } from "@/utils/trpc";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useEffect, useState } from "react";
import ChannelsDropdown from "../Channels/ChannelsDropdown";
import Stack from "../UI/Stack";
import Text from "../UI/Text";
import WorkspaceOptions from "./Workspaces/Workspace/WorkspaceOptions";

interface IWorkspaceNavProps {
  workspaceId: string;
  workspaceName: string;
  profileId: string;
  channels: IChannel[];
}

const WorkspaceNav: React.FunctionComponent<IWorkspaceNavProps> = ({
  workspaceId,
  profileId,
  workspaceName,
  channels,
}) => {
  const [openWorkspaceOptions, setOpenWorkspaceOptions] = useState(false);
  return (
    <Stack className="flex w-60 bg-slate-600">
      <div className="relative flex justify-between py-2 px-4 text-slate-200">
        <Text className=" border-b-slate-500  " size="xl">
          {workspaceName}
        </Text>
        <button
          onClick={() => setOpenWorkspaceOptions(true)}
          className="transition-color h-8 w-8 rounded-full text-xl duration-300 hover:bg-slate-500"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {openWorkspaceOptions && (
          <WorkspaceOptions
            profileId={profileId}
            workspaceId={workspaceId}
            close={() => setOpenWorkspaceOptions(false)}
          />
        )}
      </div>
      <ChannelsDropdown workspaceId={workspaceId} channels={channels} />
    </Stack>
  );
};

export default WorkspaceNav;
