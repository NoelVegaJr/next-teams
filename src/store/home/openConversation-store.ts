import create from "zustand";
interface conversation {
  conversationId: string;
  set: (id: string) => void;
}

const useConversationStore = create<conversation>()((set) => ({
  conversationId: "",
  set: (id: string) => {
    set(() => ({
      conversationId: id,
    }));
  },
}));

export default useConversationStore;
