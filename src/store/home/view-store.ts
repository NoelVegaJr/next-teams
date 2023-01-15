import type { NavLinkType } from "@/types/navigation";
import create from "zustand";

interface homeView {
  view: NavLinkType;
  set: (view: NavLinkType) => void;
}

const useHomeViewStore = create<homeView>()((set) => ({
  view: "Projects",
  set: (view: NavLinkType) => {
    set(() => ({
      view,
    }));
  },
}));

export default useHomeViewStore;
