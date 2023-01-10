import create from "zustand";
export type views =
  | "Friends"
  | "Online"
  | "Add"
  | "Pending"
  | "All"
  | "Blocked";
interface homeView {
  view: views;
  set: (view: views) => void;
}

const useFriendNavStore = create<homeView>()((set) => ({
  view: "Online",
  set: (view: views) => {
    set(() => ({
      view,
    }));
  },
}));

export default useFriendNavStore;
