import type { Profile } from "@prisma/client";
import create from "zustand";

interface profile {
  profile: Profile;
  set: (profile: Profile) => void;
}

const useHomeProfileStore = create<profile>()((set) => ({
  profile: {
    id: "",
    userId: "",
    name: "",
    banner: "",
    avatar: "",
    status: "online",
    username: "",
    // workspaceMemberships: [],
    // channelMemberships: [],
  },
  set: (profile) => {
    set(() => ({
      profile,
    }));
  },
}));

export default useHomeProfileStore;
