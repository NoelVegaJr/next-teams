import { useState } from "react";
import Friend from "./Friend";
import SearchBar from "./SearchBar";
import type { Friend as TFriend } from "@/types/types";

interface IFriendsProps {
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  view: string;
  friends: TFriend[];
  myProfileId: string;
}

const Friends: React.FunctionComponent<IFriendsProps> = ({
  setView,
  setConvo,
  view,
  friends,
  myProfileId,
}) => {
  const [username, setUsername] = useState("");
  const searchBarOnChangeHandler = (value: string) => {
    setUsername(value);
  };
  console.log(friends);
  const filteredFriends = friends.filter((friend) => {
    const match =
      friend.friendProfile.username.includes(username.trim()) &&
      friend.status === "friends";
    if (match) {
      if (view === "all") {
        return friend;
      } else if (view === "online") {
        if (friend.friendProfile.status === "online") {
          return friend;
        }
      }
    }
  });
  return (
    <>
      <SearchBar value={username} setValue={searchBarOnChangeHandler} />

      <p className=" mb-4 font-semibold uppercase text-slate-400">
        {view} Friends - {filteredFriends.length}
      </p>

      <ul className="">
        {filteredFriends.map((friend) => {
          return (
            <Friend
              key={friend.friendProfile.id}
              friend={friend}
              setConvo={setConvo}
              setView={setView}
              myProfileId={myProfileId}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Friends;
