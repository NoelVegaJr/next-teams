import { useContext, useState } from "react";
import WorkspaceList from "./WorkspaceList";
import DirectMessageDropdown from "../components/DirectMessagesDropdown";
import ChannelsDropdown from "./ChannelsDropdown";
import { WorkspaceContext } from "../context/workspace-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEnvelope,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

const WorkspaceSideNav: React.FunctionComponent = () => {
  const workspaceCtx = useContext(WorkspaceContext);
  const [isOpen, setIsOpen] = useState(true);
  console.log(isOpen);
  return (
    <section className={`flex h-full w-fit bg-slate-300 `}>
      <WorkspaceList />

      <div
        className={`flex flex-1 flex-col justify-between bg-slate-500 text-slate-200 transition-width duration-300 ${
          isOpen ? "w-52" : "  w-fit"
        }`}
      >
        {isOpen ? (
          <div>
            <p className="border-b border-slate-400 p-4 text-xl font-semibold">
              {workspaceCtx?.workspace.name}
            </p>
            <DirectMessageDropdown />
            <ChannelsDropdown />
          </div>
        ) : (
          <ul className="flex flex-col gap-4 p-4 text-xl">
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
            </li>
            <li>
              <FontAwesomeIcon icon={faHashtag} />
            </li>
          </ul>
        )}

        <div
          className={`${
            isOpen ? " pr-4 text-right" : "text-center"
          } mb-4 w-full`}
        >
          {/* <button onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={`${
                !isOpen && "rotate-180"
              } transition-all duration-300`}
            />
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default WorkspaceSideNav;
