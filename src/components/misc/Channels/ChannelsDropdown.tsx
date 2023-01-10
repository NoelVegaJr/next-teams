import { faChevronRight, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profile } from "console";
import { useEffect, useState } from "react";
import useActiveChannelsStore from "store/channel-store";
import useProfileStore from "store/profile-store";

const ChannelsDropdown = () => {
  const profileStore = useProfileStore();
  const [channelMemberships, setChannelMemberships] = useState(
    profileStore.profile.channelMemberships
  );
  const channelStore = useActiveChannelsStore();
  const [openDropdown, setOpenDropdown] = useState(true);

  useEffect(() => {
    const channels = profileStore.profile.channelMemberships.filter(
      (cm) =>
        cm.exited === false &&
        cm.channel.workspaceId === profileStore.activeWorkspace.id
    );
    setChannelMemberships(channels);
  }, [profileStore.activeWorkspace.channels]);
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
            channelMemberships.map((cm) => {
              return (
                <li
                  onClick={() => {
                    channelStore.set(profileStore.activeWorkspace.id, cm);
                  }}
                  key={cm.id}
                  className={`group flex items-center gap-2 py-2 pl-6  hover:bg-slate-700/20 ${
                    channelStore.active.get(profileStore.activeWorkspace.id)
                      ?.id === cm.id
                      ? "text-yellow-400"
                      : "text-slate-300 "
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className="group-hover:text-yellow-400"
                  />
                  <p className="group-hover:text-yellow-400">
                    {cm.channel.name}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ChannelsDropdown;
