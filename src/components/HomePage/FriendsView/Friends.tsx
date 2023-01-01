import * as React from "react";
import { UserContext } from "@/context/auth-context";
import { useContext, useState } from "react";
import Friend from "./Friend";
import SearchBar from "./SearchBar";

interface IFriendsProps {
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  view: string;
}

const Friends: React.FunctionComponent<IFriendsProps> = ({
  setView,
  setConvo,
  view,
}) => {
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const { friends } = userCtx.profile;
  const searchBarOnChangeHandler = (value: string) => {
    setUsername(value);
  };

  const filteredFriends = friends.filter((f: any) => {
    const match = f.friend.username.includes(username.trim()) && f;
    if (match) {
      if (view === "all") {
        return f;
      } else if (view === "online") {
        if (f.friend.status === "online") {
          return f;
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
        {filteredFriends.map((friend: any) => {
          const { id, username, image, status } = friend.friend;
          return (
            <Friend
              key={id}
              friendUserId={id}
              image={image}
              status={status}
              username={username}
              setConvo={setConvo}
              setView={setView}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Friends;
