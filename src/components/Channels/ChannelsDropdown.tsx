import { faChevronRight, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useLayoutEffect, useState } from "react";
import type { IChannel } from "@/types/types";
import { trpc } from "@/utils/trpc";
import useActiveChannelsStore from "store/channel-store";

const ChannelsDropdown = ({
  workspaceId,
  channels,
}: {
  channels: IChannel[];
  workspaceId: string;
}) => {
  const channelStore = useActiveChannelsStore();
  const [openDropdown, setOpenDropdown] = useState(true);
  const activeChannelId = channelStore.active.get(workspaceId)?.id;
  console.log(channelStore.active.get(workspaceId)?.id);
  return (
    <>
      <div>
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className={`group flex cursor-pointer items-center gap-4 p-2 px-4 text-slate-100`}
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
              console.log(
                channelStore.active.get(workspaceId)?.id === channel.id
              );
              return (
                <li
                  onClick={() => {
                    channelStore.set(workspaceId, channel);
                  }}
                  key={channel.id}
                  className={`group flex items-center gap-2 py-2 pl-6  ${
                    channelStore.active.get(workspaceId)?.id === channel.id
                      ? "text-yellow-400"
                      : "text-slate-300 "
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
