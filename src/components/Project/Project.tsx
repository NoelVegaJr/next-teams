import ChannelView from "@/components/misc/ChannelView/ChannelView";
import useProjectStore from "@/store/home/project-store";
import { trpc } from "@/utils/trpc";
import { profile } from "console";
import { useEffect, useState } from "react";
import useChannelStore from "store/channel-store";
import useProfileStore from "store/profile-store";
import ChatView from "../Chat/ChatView";
import MessageFeed from "../Chat/MessageFeed";
import ChannelBanner from "../misc/Channels/ChannelBanner";
import ChannelTabs from "../misc/ChannelView/ChannelTabs";
import Servers from "../misc/ServersView/Servers";
import TaskBoard from "../TaskBoard/TaskBoard";
import Whiteboard from "../Whiteboard/Whiteboard";

const Project = () => {
  const profileStore = useProfileStore();
  const projectStore = useProjectStore();
  const projectQuery = trpc.company.getProjectById.useQuery({
    id: projectStore.id,
  });

  const [tab, setTab] = useState("chat");

  return (
    <>
      <ChannelTabs onChange={(tab: string) => setTab(tab)} current={tab} />
      {tab === "chat" && projectQuery.data?.project?.contributors && (
        <ChannelBanner
          name={projectQuery.data.project.name}
          contributors={projectQuery.data.project.contributors}
        />
      )}

      {tab === "chat" && projectQuery.data?.project?.conversation && (
        <ChatView conversation={projectQuery.data.project.conversation} />
      )}

      {tab === "task board" && projectQuery.data?.project?.taskboard && (
        <TaskBoard taskboard={projectQuery.data.project.taskboard} />
      )}
      {tab === "white board" && <Whiteboard />}
      {tab === "servers" && <Servers />}
    </>
  );
};

export default Project;
