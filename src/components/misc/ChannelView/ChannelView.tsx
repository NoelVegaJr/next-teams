import MessageFeed from "@/components/Chat/MessageFeed";
import TaskBoard from "@/components/TaskBoard/TaskBoard";
import Whiteboard from "@/components/Whiteboard/Whiteboard";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import useChannelStore from "store/channel-store";
import useProfileStore from "store/profile-store";
import ChannelBanner from "../Channels/ChannelBanner";
import ChannelTabs from "./ChannelTabs";

const ChannelView = () => {
  const [tab, setTab] = useState("chat");
  const workspaceId = useProfileStore().activeWorkspace.id;
  const channelId = useChannelStore().active.get(workspaceId)?.channel?.id;
  const profileId = useProfileStore().profile.id;
  const conversation = trpc.server.getChannelConversation.useQuery({
    id: channelId ?? "",
  });
  console.log("conversation data: ", conversation.data);
  return (
    <>
      <ChannelTabs onChange={(tab: string) => setTab(tab)} current={tab} />
      <ChannelBanner />

      {tab === "chat" && (
        <>
          {conversation.data && (
            <MessageFeed
              profileId={profileId}
              conversation={conversation.data}
            />
          )}
        </>
      )}
      {tab === "task board" && <TaskBoard />}
      {tab === "white board" && <Whiteboard />}
    </>
  );
};

export default ChannelView;
