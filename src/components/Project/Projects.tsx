import * as React from "react";
import { useState } from "react";
import NewProjectModal from "../Modals/NewProjectModal";

const Projects: React.FunctionComponent = () => {
  const [newProjectModal, setNewProjectModal] = useState(false);
  return (
    <>
      <NewProjectModal
        close={() => setNewProjectModal(false)}
        isOpen={newProjectModal}
      />
      <div className="py mx-auto h-screen w-full max-w-7xl py-8">
        <button
          onClick={() => setNewProjectModal(true)}
          className="rounded bg-indigo-600 py-1 px-2 text-white"
        >
          New Project
        </button>
      </div>
    </>
  );
};

export default Projects;
