import { faChevronRight, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useContext, useState } from "react";
import { ChannelContext } from "../context/channel-context";

interface IChannel {
  id: number;
  name: string;
}

const channels = [
  { id: 1, name: "Product" },
  { id: 2, name: "Sales" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Engineering" },
];

const ChannelsDropdown: React.FunctionComponent = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const channelCtx = useContext(ChannelContext);

  return (
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
          channels.map((channel) => {
            return (
              <li
                onClick={() => channelCtx?.set(channel)}
                key={channel.id}
                className={`group flex items-center gap-2 py-2 pl-6 hover:bg-slate-600/30 ${
                  channelCtx?.channel.id === channel.id && "text-yellow-400"
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
  );
};

export default ChannelsDropdown;
