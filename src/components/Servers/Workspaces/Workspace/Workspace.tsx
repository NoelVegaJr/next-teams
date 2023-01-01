import * as React from "react";

import { useState } from "react";
import WorkspaceTabs from "./WorkspaceTabs";
import MessageFeed from "./MessageFeed";
import TaskBoard from "@/components/TaskBoard/TaskBoard";
import ChannelBanner from "@/components/Channels/ChannelBanner";
import Whiteboard from "@/components/Whiteboard/Whiteboard";

// interface IWorkSpaceProps {}

const WorkSpace: React.FunctionComponent = () => {
  const [view, setView] = useState("chat");
  return (
    <section className="flex  w-full flex-1 flex-col overflow-hidden">
      <WorkspaceTabs onChange={(tab: string) => setView(tab)} value={view} />
      <ChannelBanner />
      {view === "chat" && <MessageFeed />}
      {view === "task board" && <TaskBoard />}
      {/* {view === "white board" && <Whiteboard />} */}
      {view === "white board" && <Whiteboard />}
    </section>
  );
};

export default WorkSpace;
