import Modal from "@/components/UI/Modal";
import Text from "@/components/UI/Text";
import { trpc } from "@/utils/trpc";
import {
  faGear,
  faPlusCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const WorkspaceOptions = ({
  close,
  profileId,
  workspaceId,
}: {
  close: () => void;
  profileId: string;
  workspaceId: string;
}) => {
  const utils = trpc.useContext();
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const newChannelMutation = trpc.server.createChannel.useMutation({
    onSuccess: () => {
      utils.server.getWorkspaceById.invalidate();
    },
  });

  const createChannelHandler = async () => {
    const cleanChannelName = channelName.trim();
    if (!cleanChannelName) return;

    await newChannelMutation.mutateAsync({
      name: cleanChannelName,
      profileId,
      workspaceId,
    });
    close();
  };

  return (
    <>
      <div
        onClick={close}
        className="fixed top-0 left-0 z-50 h-screen w-full"
      />
      <ul className="absolute left-2 top-12 z-50 flex h-fit w-64 flex-col gap-2 rounded bg-slate-800 p-2 text-lg text-slate-300">
        <li className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-indigo-600">
          <p>Invite People</p>
          <FontAwesomeIcon icon={faUserPlus} />
        </li>
        <li className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-indigo-600">
          <p>Workspace Settings</p>
          <FontAwesomeIcon icon={faGear} />
        </li>
        <li className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-indigo-600">
          <button
            onClick={() => {
              setOpenCreateChannelModal(true);
            }}
            className="flex w-full items-center justify-between"
          >
            <Text>Create Channel</Text>
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </li>
      </ul>

      {openCreateChannelModal && (
        <Modal close={() => setOpenCreateChannelModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex w-96 flex-col  rounded bg-white"
          >
            <Text className="border-b p-2">Create Channel</Text>
            <div className="flex flex-col gap-2 p-2">
              <input
                type="text"
                className="w-full rounded border p-1 outline-none"
                placeholder="Channel Name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />

              <button
                onClick={createChannelHandler}
                className="w-fit self-end rounded bg-green-600 px-2 py-1"
              >
                <Text weight="semibold" className="text-white">
                  Create
                </Text>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default WorkspaceOptions;
