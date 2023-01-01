import * as React from "react";

import WorkSpace from "../components/Workspaces/Workspace/Workspace";
import WorkspaceSideNav from "../components/Workspaces/Workspace/WorkspaceSideNav";
import WorkspaceProvider from "../context/server-context";
import ChannelProvider from "../context/channel-context";

// interface IWorkspacePageProps {}

const WorkspacePage: React.FunctionComponent = () => {
  return (
    <WorkspaceProvider>
      <ChannelProvider>
        <div className="h-screen">
          <div className="flex h-full">
            <WorkspaceSideNav />
            <WorkSpace />
          </div>
        </div>
      </ChannelProvider>
    </WorkspaceProvider>
  );
};

export default WorkspacePage;
