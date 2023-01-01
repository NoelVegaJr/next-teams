import {
  faGear,
  faPlusCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkspaceOptions = ({ close }: { close: () => void }) => {
  return (
    <>
      <div
        onClick={close}
        className="fixed top-0 left-0 z-50 h-screen w-full"
      />
      <ul className="absolute left-2 top-20 z-50 flex h-fit w-64 flex-col gap-2 rounded bg-slate-800 p-2 text-lg text-slate-300">
        <li className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-indigo-600">
          <p>Invite People</p>
          <FontAwesomeIcon icon={faUserPlus} />
        </li>
        <li className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-indigo-600">
          <p>Workspace Settings</p>
          <FontAwesomeIcon icon={faGear} />
        </li>
        <li className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-indigo-600">
          <p>Create Channel</p>
          <FontAwesomeIcon icon={faPlusCircle} />
        </li>
      </ul>
    </>
  );
};

export default WorkspaceOptions;
