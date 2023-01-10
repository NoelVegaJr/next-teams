import Modal from "@/components/UI/Modal";
import { trpc } from "@/utils/trpc";
import { faX, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { WorkspaceChannel } from "@prisma/client";
import { profile } from "console";
import * as React from "react";
import { useEffect, useState } from "react";
import useProfileStore from "store/profile-store";
import LoadingButton from "./LoadingButton";
import scrollBarStyles from "@/styles/scroll.module.css";

interface IExploreChannelsModalProps {
  close: () => void;
}

interface WorkspaceChannelMemberCount extends WorkspaceChannel {
  members: { id: string }[];
}

const ExploreChannelsModal: React.FunctionComponent<
  IExploreChannelsModalProps
> = ({ close }) => {
  const utils = trpc.useContext();
  const profileStore = useProfileStore();
  const workspace = profileStore.activeWorkspace;

  const [name, setName] = useState("");
  const [channels, setChannels] = useState<WorkspaceChannelMemberCount[]>([]);
  const channelsQuery = trpc.server.listChannelsByWorkspaceId.useQuery({
    id: workspace.id,
  });

  const exitChannelMutation = trpc.server.exitChannelById.useMutation({
    onSuccess: () => {
      utils.user.getServerProfile.invalidate();
      utils.server.listChannelsByWorkspaceId.invalidate();
    },
  });

  const joinChannelMutation =
    trpc.server.createWorkspaceChannelMember.useMutation({
      onSuccess: () => {
        console.log("SUCCESSFULL JOIN");
        utils.server.listChannelsByWorkspaceId.invalidate();
        utils.user.getServerProfile.invalidate();
      },
    });

  useEffect(() => {
    const data = channelsQuery.data;
    if (data) {
      const filteredChannels = data.filter((channel) =>
        channel.name.includes(name)
      );
      setChannels(filteredChannels);
    }
  }, [channelsQuery.data, name]);

  const exitChannelHandler = async (channelId: string) => {
    const membership = profileStore.profile.channelMemberships.find(
      (cm) => cm.channelId === channelId
    );

    if (membership) {
      await exitChannelMutation.mutateAsync({ channelMemberId: membership.id });
    }
  };

  const joinChannelHandler = async (channelId: string) => {
    console.log("JOINING: ", channelId);
    await joinChannelMutation.mutateAsync({
      channelId,
      profileId: profileStore.profile.id,
    });
  };
  console.log("EXPLORING: ", profileStore.profile.channelMemberships);
  return (
    <Modal close={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-lg rounded bg-slate-600"
      >
        <div className="mb-2 flex flex-col gap-1 px-4 pt-4">
          <div className="flex justify-between">
            <p className=" font-semibold text-slate-200">
              Viewing channels in {workspace.name}
            </p>
            <button
              onClick={close}
              className="transition-color text-lg text-slate-400 duration-300 hover:text-slate-200"
            >
              <FontAwesomeIcon icon={faX} className="" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            {/* <FontAwesomeIcon icon={faHashtag} /> */}
            {/* <p>{channel?.name as string}</p> */}
          </div>
        </div>
        <div className="mb-4 px-4">
          <div className="flex items-center rounded bg-slate-700 px-2 py-1">
            <input
              type="text"
              className="w-full  bg-transparent text-slate-200 outline-none"
              placeholder="Search for channels"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={() => {
                if (name) {
                  setName("");
                }
              }}
              className="text-slate-400"
            >
              {!name ? (
                <FontAwesomeIcon icon={faSearch} />
              ) : (
                <FontAwesomeIcon icon={faX} />
              )}
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-slate-700" />
        <ul
          className={`${scrollBarStyles.scroll} max-h-72 overflow-y-auto rounded p-4`}
        >
          {!channels.length && (
            <p className="text-center text-xl font-semibold text-slate-400">
              No Channels Found
            </p>
          )}
          {channels.map((channel) => {
            const exited = profileStore.profile.channelMemberships.find(
              (cm) => cm.channelId === channel.id
            )?.exited;
            return (
              <li
                key={channel.id}
                className="group flex items-center justify-between rounded p-2 text-slate-300 hover:bg-slate-500/50"
              >
                <p className="">{channel.name}</p>
                <div className="flex items-center gap-4">
                  <p className="text-xs"> Members: {channel.members.length}</p>
                  {profileStore.profile.channelMemberships
                    .map((cm) => cm.channelId)
                    .includes(channel.id) && !exited ? (
                    <LoadingButton
                      onClick={() => exitChannelHandler(channel.id)}
                      text="Exit"
                      className="transition-color   h-8 bg-red-700/70  font-semibold text-slate-200 duration-150 hover:bg-red-600/90"
                    />
                  ) : (
                    <LoadingButton
                      onClick={() => joinChannelHandler(channel.id)}
                      text="Join"
                      className=" h-8 bg-green-700/70 font-semibold text-slate-200 duration-150 hover:bg-green-600/90"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default ExploreChannelsModal;
