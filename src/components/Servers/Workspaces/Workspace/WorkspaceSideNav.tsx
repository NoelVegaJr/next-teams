import { useState } from "react";
import WorkspaceList from "./WorkspaceList";
import DirectMessageDropdown from "@/components/HomePage/DirectMessagesDropdown";
import ChannelsDropdown from "@/components/Channels/ChannelsDropdown";
import { ServerContext } from "@/context/server-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faEnvelope,
  faHashtag,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { trpc } from "@/utils/trpc";
import Modal from "@/components/UI/Modal";
import WorkspaceOptions from "./WorkspaceOptions";
import { Profile } from "@prisma/client";

const WorkspaceSideNav = ({
  profile,
  serverName,
}: {
  profile: Profile;
  serverName: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const [openWorkspaceOptions, setOpenWorkspaceOptions] = useState(false);
  const [newChannelModal, setNewChannelModal] = useState(false);
  const createChannelMutation = trpc.server.createChannel.useMutation();
  const [newChannelName, setNewChannelName] = useState("");
  // const createChannelHandler = () => {
  //   if (!newChannelName || !userCtx?.user?.id || !serverCtx?.openWorkspace?.id)
  //     return;

  //   createChannelMutation.mutate({
  //     name: newChannelName,
  //     userId: userCtx.user.id,
  //     workspaceId: serverCtx.openWorkspace.id,
  //   });
  // };
  return (
    <>
      {newChannelModal && (
        <Modal close={() => setNewChannelModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-96 overflow-hidden rounded bg-white"
          >
            <p className="border-b p-2">Create Channel</p>
            <div className="flex flex-col gap-2 p-2">
              <input
                type="text"
                placeholder="Channel Name"
                className="w-full rounded border p-1 outline-none"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
              />
              <div className="text-right">
                <button
                  // onClick={createChannelHandler}
                  className="w-fit rounded bg-green-500 py-1 px-2 font-semibold text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <section className={`flex h-full w-fit bg-slate-300 `}>
        <WorkspaceList profile={profile} serverName={serverName} />

        <div
          className={`flex  flex-col justify-between bg-slate-600 text-slate-200 transition-width duration-300 ${
            isOpen ? "w-72" : "  w-fit"
          }`}
        >
          {isOpen ? (
            <div className="flex h-full flex-col ">
              <div className="relative mb-4 flex items-center justify-between border-b border-slate-400 ">
                <button
                  onClick={() => {
                    setOpenWorkspaceOptions(true);
                  }}
                  className="flex w-full items-center justify-between p-4 text-xl font-semibold text-white transition-all duration-200 hover:bg-slate-600 hover:brightness-110"
                >
                  {/* {serverCtx?.openWorkspace?.name} */}
                  {!openWorkspaceOptions ? (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ) : (
                    <FontAwesomeIcon icon={faX} />
                  )}
                </button>

                {openWorkspaceOptions && (
                  <WorkspaceOptions
                    close={() => setOpenWorkspaceOptions(false)}
                  />
                )}
              </div>
              <div className="flex  flex-1  grow flex-col justify-between ">
                <ChannelsDropdown />
                <DirectMessageDropdown />
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 p-4 text-xl">
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
              </li>
              <li>
                <FontAwesomeIcon icon={faHashtag} />
              </li>
            </ul>
          )}

          <div
            className={`${
              isOpen ? " pr-4 text-right" : "text-center"
            } mb-4 w-full`}
          ></div>
        </div>
      </section>
    </>
  );
};

export default WorkspaceSideNav;
