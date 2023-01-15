import type { Profile } from "@prisma/client";
import create from "zustand";

type staffMap = Record<string, Profile>;

interface staff {
  staff: staffMap;
  set: (member: Profile) => void;
}

const useStaffStore = create<staff>()((set) => ({
  staff: {},
  set: (member) => {
    set((state) => {
      state.staff[member.id] = member;
      return { staff: state.staff };
    });
  },
}));

export default useStaffStore;
