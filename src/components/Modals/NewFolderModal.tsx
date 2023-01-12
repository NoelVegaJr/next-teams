import * as React from "react";
import { useState } from "react";
import MyModal from "./Modal";

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
    <MyModal title="New Folder" isOpen={isOpen} close={close}>
      <div className="flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full rounded"
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
    </MyModal>
  );
};

export default NewFolderModal;
