import { useState } from "react";
import AddFriendView from "./AddFriendView";
import Friends from "./Friends";
import FriendsNav from "./FriendsNav";
import PendingFriendRequestsView from "./PendingFriendRequestsView";

interface IFriendsViewProps {
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  // online: { id: string; username: string; image: string }[];
}

const FriendsView: React.FunctionComponent<IFriendsViewProps> = ({
  setView,
  setConvo,
}) => {
  const [active, setActive] = useState("online");

  return (
    <>
      <FriendsNav active={active} setActive={(tab: string) => setActive(tab)} />
      <div className="mx-6">
        {active === "addfriend" && <AddFriendView />}
        {active === "pending" && <PendingFriendRequestsView />}
        {["all", "online"].includes(active) && (
          <Friends view={active} setConvo={setConvo} setView={setView} />
        )}
      </div>
    </>
  );
};

export default FriendsView;
