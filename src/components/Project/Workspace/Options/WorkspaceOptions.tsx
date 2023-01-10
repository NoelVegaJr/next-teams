import BackDrop from "@/components/UI/Backdrop";
import {
  faGear,
  faPlusCircle,
  faSearch,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import WorkspaceOptionModals from "./WorkspaceOptionModals";
import Option from "./Option";

const WorkspaceOptions = ({ close }: { close: () => void }) => {
  const [modalType, setModalType] = useState<
    "newChannel" | "invite" | "settings" | "explore" | null
  >(null);

  return (
    <>
      <BackDrop close={close} />
      <ul
        className={`absolute left-2.5 top-12 z-50 flex h-fit w-11/12 flex-col gap-2 rounded bg-slate-800 p-2 text-xs  text-slate-300 ${
          modalType && "hidden"
        }`}
      >
        <Option
          text="Invite"
          onClick={() => setModalType("invite")}
          icon={faUserPlus}
        />
        <Option
          text="New Channel"
          onClick={() => setModalType("newChannel")}
          icon={faPlusCircle}
        />
        <Option
          text="Explore"
          onClick={() => setModalType("explore")}
          icon={faSearch}
        />
        <Option
          text="Settings"
          onClick={() => setModalType("settings")}
          icon={faGear}
        />
      </ul>
      {modalType && <WorkspaceOptionModals type={modalType} close={close} />}
    </>
  );
};

export default WorkspaceOptions;
