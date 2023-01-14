import useCompanyStore from "@/store/company-store";
import useProfileStore from "@/store/home/profile-store";
import { trpc } from "@/utils/trpc";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "./Modal";

interface INewProjectModalProps {
  close: () => void;
  isOpen: boolean;
}

const NewProjectModal: React.FunctionComponent<INewProjectModalProps> = ({
  close,
  isOpen,
}) => {
  const utils = trpc.useContext();
  const companyStore = useCompanyStore();
  const profileStore = useProfileStore();
  const [name, setName] = useState("");
  const newProjectMutation = trpc.company.newProject.useMutation({
    onSuccess: () => {
      toast.success(`Project ${name} created`);
    },
    onError: () => {
      toast.error(`Failed to create project ${name}`);
    },
  });
  const createProjectHandler = () => {
    newProjectMutation.mutate({
      name,
      companyId: companyStore.id,
      profileId: profileStore.profile.id,
    });
    close();
  };

  return (
    <Modal title="New Project" isOpen={isOpen} close={close}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="mb-2 w-full rounded"
      />
      <button
        onClick={createProjectHandler}
        className="w-full rounded bg-indigo-600 py-1 text-white"
      >
        Submit
      </button>
    </Modal>
  );
};

export default NewProjectModal;
