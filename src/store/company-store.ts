import type { Company, Profile, Project } from "@prisma/client";
import create from "zustand";

interface company extends Omit<Company, "createdAt"> {
  staff: Profile[];
  projects: Project[];
  set: (company: Omit<Company, "createdAt">) => void;
}

const useCompanyStore = create<company>()((set) => ({
  id: "",
  name: "",
  address: "",
  phone: "",
  image: "",
  banner: "",
  staff: [],
  projects: [],
  set: (company: Omit<Company, "createdAt">) => {
    set(() => company);
  },
}));

export default useCompanyStore;
