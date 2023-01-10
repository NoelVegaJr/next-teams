import ChannelView from "@/components/misc/ChannelView/ChannelView";
import { useEffect } from "react";
import useChannelStore from "store/channel-store";
import useProfileStore from "store/profile-store";

const WorkSpace = () => {
  const profileStore = useProfileStore();
  const channelStore = useChannelStore();
  const workspaceId = profileStore.activeWorkspace.id;

  useEffect(() => {
    if (!channelStore.active.get(workspaceId)) {
      const channelMembership = profileStore.profile.channelMemberships.filter(
        (cm) => cm.channel.workspaceId === profileStore.activeWorkspace.id
      )[0];
      channelStore.set(workspaceId, channelMembership);
    }
  }, [profileStore.activeWorkspace, workspaceId]);

  return (
    <section className="flex  h-full w-full">
      {/* <WorkspaceNav /> */}
      <div className="flex flex-1 flex-col">
        <ChannelView />
      </div>
    </section>
  );
};

export default WorkSpace;
