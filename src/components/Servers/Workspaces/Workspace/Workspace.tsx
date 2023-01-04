import { useEffect, useLayoutEffect, useState } from "react";
import WorkspaceTabs from "./WorkspaceTabs";
import MessageFeed from "./MessageFeed";
import TaskBoard from "@/components/TaskBoard/TaskBoard";
import ChannelBanner from "@/components/Channels/ChannelBanner";
import Whiteboard from "@/components/Whiteboard/Whiteboard";
import type { IWorkspace } from "@/types/types";
import WorkspaceNav from "../../WorkspaceNav";
import { trpc } from "@/utils/trpc";
import useChannelStore from "store/channel-store";

const WorkSpace = ({
  workspace,
  profileId,
}: {
  workspace: IWorkspace;
  profileId: string;
}) => {
  const [view, setView] = useState("chat");
  const channelStore = useChannelStore();

  useEffect(() => {
    if (!channelStore.active.get(workspace.id))
      channelStore.set(workspace.id, workspace.channels[0]);
  }, [workspace, channelStore]);

  return (
    <section className="flex  w-full ">
      <WorkspaceNav
        profileId={profileId}
        workspaceId={workspace.id}
        workspaceName={workspace.name}
        channels={workspace.channels}
      />
      <div className="flex flex-1 flex-col">
        <WorkspaceTabs onChange={(tab: string) => setView(tab)} value={view} />
        <ChannelBanner
          channel={
            channelStore.active.get(workspace.id)! ?? workspace.channels[0]
          }
        />
        {view === "chat" && <MessageFeed />}
        {view === "task board" && <TaskBoard />}
        {view === "white board" && <Whiteboard />}
      </div>
    </section>
  );
};

export default WorkSpace;
