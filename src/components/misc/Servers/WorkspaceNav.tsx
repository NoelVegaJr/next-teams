import { faChevronDown, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useProfileStore from "store/profile-store";
import useServerStore from "store/server-store";
import ChannelsDropdown from "../Channels/ChannelsDropdown";
import Stack from "../UI/Stack";
import WorkspaceOptions from "./Workspace/Options/WorkspaceOptions";

const WorkspaceNav = () => {
  const [openWorkspaceOptions, setOpenWorkspaceOptions] = useState(false);
  const name = useProfileStore().activeWorkspace.name;
  return (
    <Stack className="flex w-60 bg-slate-600">
      <div className="relative flex justify-between py-2 px-4 text-slate-200">
        <button
          onClick={() => setOpenWorkspaceOptions(true)}
          className=" flex  w-full items-center justify-between border-b-slate-500 text-left"
        >
          <p className="font-bold">{name}</p>

          {!openWorkspaceOptions ? (
            <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
          ) : (
            <FontAwesomeIcon icon={faX} className="text-sm" />
          )}
        </button>
        {openWorkspaceOptions && (
          <WorkspaceOptions close={() => setOpenWorkspaceOptions(false)} />
        )}
      </div>
      <ChannelsDropdown />
    </Stack>
  );
};

export default WorkspaceNav;
