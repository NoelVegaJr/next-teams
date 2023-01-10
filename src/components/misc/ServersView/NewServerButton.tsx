import { useState } from "react";
import NewServerModal from "../Modals/NewServerModal";

const NewServerButton: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NewServerModal close={() => setIsOpen(false)} isOpen={isOpen} />

      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      >
        Add server
      </button>
    </>
  );
};

export default NewServerButton;
