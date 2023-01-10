import { faHome, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import useProfileStore from "store/profile-store";
import Stack from "../UI/Stack";
import Tile from "../UI/Tile";
import NewWorkspaceModal from "./Workspace/Options/NewWorkspaceModal";

interface IServerNavProps {
  setView: (view: string) => void;
}

const ServerNav: React.FunctionComponent<IServerNavProps> = ({ setView }) => {
  const profileStore = useProfileStore();
  const [newWorkspaceModal, setNewWorkspaceModal] = useState(false);

  return (
    <>
      <Stack gap={4} className="justify-between bg-slate-900 p-2" center>
        <Stack gap={3} center>
          <Link href="/home">
            <FontAwesomeIcon
              icon={faHome}
              className="text-4xl text-slate-400"
            />
          </Link>
          <button onClick={() => setView("serverOptions")} className="group ">
            <FontAwesomeIcon
              icon={faGear}
              className="text-4xl text-slate-400 transition-transform duration-500  group-hover:rotate-180"
            />
          </button>
          <div className="h-0.5 w-full rounded bg-slate-400" />
          <Stack center gap={4}>
            {profileStore.profile.workspaceMemberships.map((membership) => {
              const { id, image } = membership.workspace;
              return (
                <button
                  onClick={() => {
                    profileStore.setActiveWorkspace(membership.workspace);
                  }}
                  key={id}
                >
                  <Tile
                    src={image}
                    className="border border-slate-400 hover:border-indigo-600"
                    size="sm"
                  />
                </button>
              );
            })}
          </Stack>
        </Stack>
        <button
          onClick={() => setNewWorkspaceModal(true)}
          className="h-12 w-full rounded border border-slate-400"
        >
          <FontAwesomeIcon icon={faPlus} className="text-green-600" />
        </button>
      </Stack>
      {newWorkspaceModal && (
        <NewWorkspaceModal
          close={() => {
            setNewWorkspaceModal(false);
          }}
        />
      )}
    </>
  );
};

export default ServerNav;
