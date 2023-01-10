import CreateChannelModal from "./CreateChannelModal";
import ExploreChannelsModal from "./ExploreChannelsModal";
import InvitePeopleModal from "./InvitePeopleModal";
import WorkspaceSettingsModal from "./WorkspaceSettingsModal";

interface IWorkspaceOptionModalsProps {
  type: "newChannel" | "invite" | "settings" | "explore" | null;
  close: () => void;
}

const WorkspaceOptionModals: React.FunctionComponent<
  IWorkspaceOptionModalsProps
> = ({ type, close }) => {
  switch (type) {
    case "newChannel":
      return <CreateChannelModal close={close} />;
    case "invite":
      return <InvitePeopleModal close={close} />;
    case "settings":
      return <WorkspaceSettingsModal close={close} />;
    case "explore":
      return <ExploreChannelsModal close={close} />;
    default:
      return <div>error</div>;
  }
};

export default WorkspaceOptionModals;
