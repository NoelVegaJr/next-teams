import Modal from "@/components/UI/Modal";
import Text from "@/components/UI/Text";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import useChannelStore from "store/channel-store";
import useProfileStore from "store/profile-store";
import LoadingButton from "./LoadingButton";

interface IAppProps {
  close: () => void;
}

const CreateChannelModal: React.FunctionComponent<IAppProps> = ({ close }) => {
  const utils = trpc.useContext();
  const profileStore = useProfileStore();
  const channelStore = useChannelStore();
  const workspaceId = profileStore.activeWorkspace.id;
  const profileId = profileStore.profile.id;
  const [name, setName] = useState("");

  const newChannelMutation = trpc.server.createChannel.useMutation({
    onSuccess: (data) => {
      utils.user.getServerProfile.invalidate();
      if (data) {
        console.log("data return ", data);
        channelStore.active.set(profileStore.activeWorkspace.id, data);
      }
    },
  });

  const createChannelHandler = async () => {
    const cleanChannelName = name.trim();
    if (!cleanChannelName) return;

    await newChannelMutation.mutateAsync({
      name: cleanChannelName,
      profileId,
      workspaceId,
    });
    close();
  };

  return (
    <Modal close={close}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <LoadingButton
            onClick={createChannelHandler}
            text="Create"
            className="w-full rounded bg-green-600 px-2 py-1 text-white"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateChannelModal;
