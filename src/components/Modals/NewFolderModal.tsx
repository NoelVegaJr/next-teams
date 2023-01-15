import { useState } from "react";
import Modal from "./Modal";

interface INewFolderModalProps {
  isOpen: boolean;
  close: () => void;
  action: (name: string) => void;
}

const NewFolderModal: React.FunctionComponent<INewFolderModalProps> = ({
  isOpen,
  close,
  action,
}) => {
  const [name, setName] = useState("");
  return (
    <Modal
      title="New Folder"
      isOpen={isOpen}
      close={close}
      styles={{ modal: "rounded-lg" }}
    >
      <div className=" flex flex-col gap-2 ">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          autoFocus
          className="border- w-full rounded border-2 p-1 outline-blue-600"
          placeholder="Name"
        />
        <button
          onClick={() => {
            action(name);
          }}
          className="rounded bg-blue-500 py-1 px-2 text-white"
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default NewFolderModal;
