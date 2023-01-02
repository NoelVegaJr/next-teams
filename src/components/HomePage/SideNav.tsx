import type {
  IConversationWithMessages,
  IConversationWithParticipant,
} from "@/types/types";
import { trpc } from "@/utils/trpc";
import {
  faUserFriends,
  faServer,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Profile } from "@prisma/client";
import * as React from "react";
import { useEffect, useState } from "react";
import Avatar from "../UI/Avatar";

interface ISideNavProps {
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  view: string;
  initialConversations: IConversationWithMessages[];
  convo: string;
  profile: Profile;
}

const SideNav: React.FunctionComponent<ISideNavProps> = ({
  setView,
  setConvo,
  view,
  initialConversations,
  convo,
  profile,
}) => {
  const [conversations, setConversations] =
    useState<IConversationWithMessages[]>(initialConversations);

  const conversationsQuery = trpc.chat.listConversations.useQuery({
    profileId: profile.id,
  });

  useEffect(() => {
    if (conversationsQuery.data) {
      setConversations(conversationsQuery.data);
    }
  }, [conversationsQuery]);
  return (
    <nav className="flex h-screen w-80 flex-col bg-slate-700 pt-2">
      <div className="flex-1">
        <ul className="flex flex-col gap-1 text-xl text-slate-100">
          <li
            onClick={() => {
              setConvo("");
              setView("friends");
            }}
            className={`mx-2 flex cursor-pointer items-center gap-8 rounded p-4 transition-all duration-200 hover:bg-slate-600 ${
              view === "friends" && "bg-slate-600"
            }`}
          >
            <FontAwesomeIcon icon={faUserFriends} /> <p>Friends</p>
          </li>
          <li
            onClick={() => {
              setConvo("");
              setView("servers");
            }}
            className={`mx-2 flex cursor-pointer items-center gap-8 rounded p-4 transition-all duration-200 hover:bg-slate-600 ${
              view === "servers" && "bg-slate-600"
            }`}
          >
            <FontAwesomeIcon icon={faServer} /> <p>Servers</p>
          </li>
        </ul>
        <div
          onClick={() => setView("servers")}
          className="m-2 flex  items-center justify-between rounded px-4  text-sm font-semibold uppercase text-slate-300 transition-all duration-200 hover:text-slate-200 "
        >
          <p>Direct Messages</p>
          <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
        </div>
        <ul className="flex flex-col gap-1 px-2">
          {conversations?.map((conversation) => {
            return (
              <li
                key={conversation.id}
                onClick={() => {
                  setConvo(conversation.id);
                  setView("chat");
                }}
                className="flex"
              >
                {conversation.participants.length === 2 ? (
                  <>
                    {conversation.participants.map(
                      ({ profile: participantProfile }) => {
                        if (profile.userId !== participantProfile.userId)
                          return (
                            <div
                              key={participantProfile.id}
                              className={`flex w-full cursor-pointer items-center gap-4 rounded-lg px-4  py-2 hover:bg-slate-600 ${
                                convo === conversation.id && "bg-slate-600"
                              }`}
                            >
                              <Avatar
                                image={participantProfile.avatar}
                                size="sm"
                                status={participantProfile.status}
                                username={participantProfile.username}
                              />
                              <p
                                className={`text-lg font-semibold text-slate-200 `}
                              >
                                {participantProfile.username}
                              </p>
                            </div>
                          );
                      }
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className={`flex w-full cursor-pointer items-center gap-4  rounded-lg px-4 py-2 hover:bg-slate-600 ${
                        convo === conversation.id && "bg-slate-600"
                      }`}
                    >
                      <div className="grid h-10 w-10 place-content-center rounded-full bg-indigo-600 text-white">
                        <FontAwesomeIcon icon={faUserFriends} />
                      </div>
                      <div>
                        <p
                          className={`-mb-1 w-52 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-slate-200`}
                        >
                          {conversation.participants
                            ?.map(({ profile: participantProfile }) => {
                              return participantProfile.username;
                            })
                            .filter((username) => username != profile.username)
                            .join(" , ")}
                        </p>
                        <p className="text-sm text-slate-400">
                          {conversation.participants.length} Members
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-3 bg-slate-800 p-4">
        <Avatar
          image={profile.avatar}
          size="sm"
          status={profile.status}
          username={profile.username}
        />
        <p className="font-semibold text-white">{profile?.username}</p>
      </div>
    </nav>
  );
};

export default SideNav;
