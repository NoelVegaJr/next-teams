import { IChannel } from "@/types/types";
import { string } from "zod";
import create from "zustand";

interface activeChannels {
  active: Map<string, IChannel>;
  set: (workspaceId: string, channel: IChannel) => void;
}

const useChannelStore = create<activeChannels>()((set) => ({
  active: new Map<string, IChannel>(),
  set: (workspaceId, channelId) => {
    set((state) => ({
      active: state.active.set(workspaceId, channelId),
    }));
  },
}));

export default useChannelStore;
