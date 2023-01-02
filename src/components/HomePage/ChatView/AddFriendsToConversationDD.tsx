import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import Avatar from "@/components/UI/Avatar";
import DirectMessageButton from "../FriendsView/DirectMessageButton";
import type { Friend } from "@/types/types";

interface IAddFriendsToConversationDDProps {
  currentParticipantUserIds: string[];
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  close: () => void;
  friends: Friend[];
}

const AddFriendsToConversationDD: React.FunctionComponent<
  IAddFriendsToConversationDDProps
> = ({ currentParticipantUserIds, setView, setConvo, close, friends }) => {
  const [conversationInvites, setConversationInvites] = useState<string[]>([
    ...currentParticipantUserIds,
  ]);

  const closeHandler = () => {
    setConversationInvites([]);
    close();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 h-screen w-full cursor-default"
        onClick={closeHandler}
      />

      <div
        className="absolute -left-72 top-8 z-50 flex h-fit cursor-default flex-col gap-5 rounded border border-slate-700 bg-slate-600 p-4 text-left drop-shadow-2xl"
        style={{ width: "450px", left: "-500px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-left">
          <p className=" mb-1 text-2xl font-semibold text-slate-200">
            Select Friends
          </p>
          <p className="text-sm">You can add 8 more friends</p>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            className="w-full rounded bg-slate-800 p-2 text-base outline-none"
            placeholder="Type the username of a friend"
          />
        </div>
        <div>
          <ul className="cursor-pointer ">
            {friends.map((f) => {
              const { id, username, avatar, status } = f.friendProfile;
              if (!currentParticipantUserIds.map((pid) => pid).includes(id)) {
                return (
                  <li
                    key={id}
                    className="flex items-center justify-between  rounded p-2 hover:bg-slate-700/30"
                    onClick={() => {
                      // // first invite
                      // if (conversationInvites.length === 0) {
                      //   setConversationInvites(() => [id]);
                      //   return;
                      // }

                      const exists = conversationInvites.includes(id);

                      if (exists) {
                        // remove friend from invite list
                        setConversationInvites((prev) => {
                          return [
                            ...prev.filter((prev_userId) => prev_userId !== id),
                          ];
                        });
                      } else {
                        // add friend to invite list
                        setConversationInvites((prev) => {
                          return [...prev, id];
                        });
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar
                        size="xs"
                        status={status}
                        username={username}
                        image={avatar}
                      />
                      <p className="font-normal text-slate-300">{username}</p>
                    </div>
                    <div
                      className={`grid h-6 w-6 place-content-center  rounded-lg border border-slate-500 ${
                        conversationInvites.includes(id)
                          ? "border-indigo-500"
                          : "border-slate-500"
                      }`}
                    >
                      {conversationInvites.includes(id) && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-xl font-bold text-indigo-500"
                        />
                      )}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
          <div className="p-4">
            <DirectMessageButton
              profileIds={conversationInvites}
              setView={setView}
              setConvo={setConvo}
            />
            <button
              disabled={conversationInvites.length === 0}
              className={`w-full rounded bg-indigo-500 p-2 px-6 font-semibold text-slate-100 ${
                conversationInvites.length === 0 && "brightness-75"
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFriendsToConversationDD;
