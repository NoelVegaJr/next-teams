import { Friend } from "@/types/types";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import AddFriendView from "./AddFriendView";
import Friends from "./Friends";
import FriendsNav from "./FriendsNav";
import PendingFriendRequestsView from "./PendingFriendRequestsView";

interface IFriendsViewProps {
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  initialFriends: Friend[];
  profileId: string;
}

const FriendsView: React.FunctionComponent<IFriendsViewProps> = ({
  setView,
  setConvo,
  initialFriends,
  profileId,
}) => {
  const [active, setActive] = useState("online");
  const [friends, setFriends] = useState(initialFriends);

  const friendsQuery = trpc.user.getFriends.useQuery({ profileId });

  useEffect(() => {
    if (friendsQuery.data) {
      setFriends(friendsQuery.data);
    }
  }, [friendsQuery, friends]);
  return (
    <>
      <FriendsNav
        active={active}
        setActive={(tab: string) => setActive(tab)}
        pending={
          friends.filter((f) => ["pending", "recieved"].includes(f.status))
            .length
        }
      />
      <div className="mx-6">
        {active === "addfriend" && <AddFriendView profileId={profileId} />}
        {active === "pending" && (
          <PendingFriendRequestsView
            myProfileId={profileId}
            friends={friends.filter((f) =>
              ["pending", "recieved"].includes(f.status)
            )}
          />
        )}
        {["all", "online"].includes(active) && (
          <Friends
            friends={friends}
            view={active}
            setConvo={setConvo}
            setView={setView}
            myProfileId={profileId}
          />
        )}
      </div>
    </>
  );
};

export default FriendsView;
