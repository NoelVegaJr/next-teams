import type { NextPageContext } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/auth-context";
import ServerList from "../components/HomePage/ServersView/ServerList";
import Invitations from "../components/HomePage/ServersView/Invitations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faServer,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import FriendsView from "../components/HomePage/FriendsView/FriendsView";
import ChatView from "../components/HomePage/ChatView/ChatView";
import { trpc } from "../utils/trpc";
import styles from "../styles/scroll.module.css";
import client from "pusher-js";
import Avatar from "@/components/UI/Avatar";

interface IInvitation {
  id: string;
  type: string;
  name: string;
  sender: string;
}

const invitations: IInvitation[] = [
  { id: "1", type: "Channel", name: "Human Resources", sender: "Tommy Nicks" },
  { id: "2", type: "Channel", name: "Product", sender: "Tommy Nicks" },
  { id: "3", type: "Server", name: "Dunder Mifflin", sender: "Michael Scott" },
];

export const getServerSideProps = async (ctx: NextPageContext) => {
  const data = await getSession(ctx);

  if (!data?.user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: { userId: "" },
    };
  }

  if (!data?.user?.username) {
    return {
      redirect: {
        permanent: false,
        destination: "/UserCreation",
      },
      props: { userId: "" },
    };
  }

  return {
    props: {
      userId: data.user.id,
      username: data.user.username,
    },
  };
};

export default function HomePage(props: any) {
  const [view, setView] = useState("servers");
  const [convo, setConvo] = useState<string>();
  const userCtx = useContext(UserContext);
  const conversationsQuery = trpc.chat.listConversations.useQuery({
    userId: userCtx?.profile?.user?.id ?? "",
  });

  useEffect(() => {
    const userId = props.userId;
    const pusherClient = new client("99e512a0e34c2dc7612d", {
      cluster: "us2",
      channelAuthorization: {
        transport: "ajax",
        endpoint: "http://localhost:3000/api/pusher/auth",
        params: {
          user_id: userId,
        },
      },
    });

    pusherClient.subscribe("presence-quickstart");
  }, []);

  const updateConvo = (conversationId: string) => {
    setConvo(conversationId);
  };

  if (!userCtx?.profile?.user?.id) return <div />;

  return (
    <div className="flex h-screen bg-slate-600 pb-20">
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
            {conversationsQuery?.data?.map((conversation: any) => {
              return (
                <li
                  key={conversation.id}
                  onClick={() => {
                    setConvo(conversation.id);
                    setView("chat");
                  }}
                  className="flex"
                >
                  {conversation?.participants.length === 2 ? (
                    <>
                      {conversation?.participants?.map((p: any) => {
                        const { id: pid, username, image, status } = p.user;
                        if (userCtx?.profile?.user.id !== p.user.id)
                          return (
                            <div
                              key={p.id}
                              className={`flex w-full cursor-pointer items-center gap-4 rounded-lg px-4  py-2 hover:bg-slate-600 ${
                                convo === conversation.id && "bg-slate-600"
                              }`}
                            >
                              <Avatar
                                image={image}
                                size="sm"
                                status={status}
                                username={username}
                              />
                              <p
                                className={`text-lg font-semibold text-slate-200 `}
                              >
                                {p.user.username}
                              </p>
                            </div>
                          );
                      })}
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
                            {conversation?.participants
                              ?.map((p: any) => {
                                return p.user.username;
                              })
                              .filter(
                                (username: string) =>
                                  username != userCtx.profile.user.username
                              )
                              .join(" , ")}
                          </p>
                          <p className="text-sm text-slate-400">
                            {conversation?.participants.length} Members
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
            image={userCtx.profile.user.image}
            size="sm"
            status={userCtx.profile.user.status}
            username={userCtx.profile.user.username}
          />
          <p className="font-semibold text-white">
            {userCtx?.profile?.user?.username}
          </p>
        </div>
      </nav>

      <div
        className={`scroll mx-auto h-screen w-full overflow-y-auto ${styles.scroll}`}
      >
        {view === "servers" && (
          <div className="flex flex-col gap-12 p-4">
            {userCtx?.profile?.user?.email && (
              <>
                <ServerList
                  servers={userCtx.profile.servers}
                  userId={userCtx.profile.user.id}
                  email={userCtx.profile.user.email}
                />
                <Invitations invitations={invitations} />
              </>
            )}
          </div>
        )}
        {view === "friends" && (
          <FriendsView
            setConvo={updateConvo}
            setView={(view: string) => setView(view)}
            // online={online}
          />
        )}
        {view === "chat" && (
          <ChatView
            convo={convo}
            setConvo={updateConvo}
            setView={(view: string) => setView(view)}
          />
        )}
      </div>
    </div>
  );
}
