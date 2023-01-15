import ChannelView from "@/components/misc/ChannelView/ChannelView";
import useCompanyStore from "@/store/company-store";
import useProjectStore from "@/store/home/project-store";
import { trpc } from "@/utils/trpc";
import { profile } from "console";
import { useEffect, useState } from "react";
import useChannelStore from "store/channel-store";
import useProfileStore from "store/profile-store";
import ChatView from "../Chat/ChatView";
import MessageFeed from "../Chat/MessageFeed";
import MessageLoading from "../Chat/MessageLoading";
import ChannelBanner from "../misc/Channels/ChannelBanner";
import ChannelTabs from "../misc/ChannelView/ChannelTabs";
import Servers from "../misc/ServersView/Servers";
import TaskBoard from "../TaskBoard/TaskBoard";
import Whiteboard from "../Whiteboard/Whiteboard";

const Project = () => {
  const projectStore = useProjectStore();
  const companyStore = useCompanyStore();
  const projectQuery = trpc.company.getProjectById.useQuery({
    id: projectStore.currentProjectId,
  });

  const project = projectStore.projects[projectStore.currentProjectId];

  const [tab, setTab] = useState("chat");
  console.log(projectStore.projects[projectStore.currentProjectId]);
  return (
    <>
      <ChannelTabs onChange={(tab: string) => setTab(tab)} current={tab} />
      <ChannelBanner name={project.name} contributors={project.contributors} />

      {tab === "chat" &&
        (project.conversation ? (
          <ChatView conversation={project.conversation} />
        ) : (
          <div>
            <MessageLoading />
            <MessageLoading />
            <MessageLoading />
          </div>
        ))}

      {tab === "task board" && <TaskBoard taskboard={project.taskboard} />}
      {tab === "white board" && <Whiteboard />}
      {tab === "servers" && <Servers />}
    </>
  );
};

export default Project;
