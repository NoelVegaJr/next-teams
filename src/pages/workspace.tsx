import * as React from "react";

import WorkSpace from "../components/Workspace";
import WorkspaceSideNav from "../components/WorkspaceSideNav";
import WorkspaceProvider from "../context/workspace-context";
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
