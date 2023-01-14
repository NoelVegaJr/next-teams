import create from "zustand";

interface project {
  id: any;
  set: (id: string) => void;
}

const useProjectStore = create<project>()((set) => ({
  id: "",
  set: (id) => {
    set(() => ({
      id,
    }));
  },
}));

export default useProjectStore;
