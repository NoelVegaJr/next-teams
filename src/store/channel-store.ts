import type { IChannel, WorkspaceChannelMemberAndChannel } from "@/types/types";
import { WorkspaceChannel } from "@prisma/client";
import create from "zustand";

interface activeChannels {
  active: Map<string, WorkspaceChannelMemberAndChannel>;
  set: (
    workspaceId: string,
    channelMember: WorkspaceChannelMemberAndChannel
  ) => void;
}

const useChannelStore = create<activeChannels>()((set) => ({
  active: new Map<string, WorkspaceChannelMemberAndChannel>(),
  set: (workspaceId, channelMember) => {
    set((state) => ({
      active: state.active.set(workspaceId, channelMember),
    }));
  },
}));

export default useChannelStore;
