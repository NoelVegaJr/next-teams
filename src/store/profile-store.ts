import { ActiveWorkspace, ServerProfile } from "@/types/types";
import type { Profile } from "@prisma/client";
import create from "zustand";

interface profile {
  profile: ServerProfile;
  activeWorkspace: ActiveWorkspace;
  serverId: string;
  set: (profile: ServerProfile) => void;
  setServerId: (id: string) => void;
  setActiveWorkspace: (workspace: ActiveWorkspace) => void;
}

const useProfileStore = create<profile>()((set) => ({
  profile: {
    id: "",
    name: "",
    banner: "",
    avatar: "",
    status: "online",
    workspaceMemberships: [],
    channelMemberships: [],
  },
  serverId: "",
  activeWorkspace: {
    _count: { members: 0 },
    image: "",
    createdAt: new Date(),
    id: "",
    name: "",
    serverId: "",
    channels: [],
  },
  set: (profile) => {
    set(() => ({
      profile,
    }));
  },
  setActiveWorkspace: (workspace) => {
    set(() => ({
      activeWorkspace: workspace,
    }));
  },
  setServerId: (id) => {
    set(() => ({
      serverId: id,
    }));
  },
}));

export default useProfileStore;
