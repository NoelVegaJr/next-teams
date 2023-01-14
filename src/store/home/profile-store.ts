import type { Profile } from "@prisma/client";
import create from "zustand";

interface profile {
  profile: any;
  set: (profile: Profile) => void;
}

const useProfileStore = create<profile>()((set) => ({
  profile: {
    id: "",
    companyId: "",
    name: "",
    role: "",
    phone: "",
    email: "",
    address: "",
    banner: "",
    avatar: "",
    status: "online",
    Company: {
      name: "",
      address: "",
      phone: "",
      image: "",
      banner: "",
    },
  },
  set: (profile) => {
    set(() => ({
      profile,
    }));
  },
}));

export default useProfileStore;
