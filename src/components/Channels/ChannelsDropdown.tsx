import { faChevronRight, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ServerContext } from "@/context/server-context";

const ChannelsDropdown: React.FunctionComponent = () => {
  const serverCtx = useContext(ServerContext);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      <div>
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className={`group flex cursor-pointer items-center gap-4 p-2 px-4`}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`transition-all duration-300 ${
              openDropdown && "rotate-90"
            }`}
          />
          <p>Channels</p>
        </div>

        <ul className="flex cursor-pointer flex-col ">
          {openDropdown &&
            serverCtx?.openWorkspace?.channels.map((channel: any) => {
              return (
                <li
                  onClick={() => serverCtx?.setChannel(channel)}
                  key={channel.id}
                  className={`group flex items-center gap-2 py-2 pl-6 hover:bg-slate-600/30 ${
                    serverCtx?.openChannel?.id === channel.id &&
                    "text-yellow-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className="group-hover:text-yellow-400"
                  />
                  <p className="group-hover:text-yellow-400">{channel.name}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ChannelsDropdown;
