import type { NavLinkType } from "@/types/navigation";
import create from "zustand";

interface homeView {
  view: NavLinkType;
  set: (view: NavLinkType) => void;
}

const useHomeViewStore = create<homeView>()((set) => ({
  view: "Servers",
  set: (view: NavLinkType) => {
    set(() => ({
      view,
    }));
  },
}));

export default useHomeViewStore;
