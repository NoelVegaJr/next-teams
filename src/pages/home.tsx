import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ServerList from "@/components/HomePage/ServersView/ServerList";
import Invitations from "@/components/HomePage/ServersView/Invitations";
import FriendsView from "../components/HomePage/FriendsView/FriendsView";
import ChatView from "../components/HomePage/ChatView/ChatView";
import { trpc } from "@/utils/trpc";
import type {
  Friend,
  IConversationWithMessages,
  IConversationWithParticipant,
} from "@/types/types";
import styles from "@/styles/scroll.module.css";
import client from "pusher-js";
import Avatar from "@/components/UI/Avatar";
import { prisma } from "@/server/db/client";
import type { Conversation, Friendship, Profile, Server } from "@prisma/client";
import SideNav from "@/components/HomePage/SideNav";
import { json } from "stream/consumers";

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
  const session = await getSession(ctx);
  console.log("HOME SERVER PROPS");
  if (!session?.user?.id) {
    console.log("NO USER ID");
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      servers: true,
    },
  });

  if (!profile?.username) {
    console.log("NO PROFILE");

    return {
      redirect: {
        permanent: false,
        destination: "/UserCreation",
      },
      props: {},
    };
  }

  let conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          profileId: profile.id,
        },
      },
    },
    select: {
      id: true,
      participants: {
        select: {
          id: true,
          profile: true,
        },
      },
      messages: {
        select: {
          id: true,
          date: true,
          text: true,
          participant: {
            select: {
              id: true,
              profile: true,
            },
          },
        },
      },
    },
  });

  conversations = JSON.parse(JSON.stringify(conversations));

  const friends = await prisma.friendship.findMany({
    where: {
      friendId: profile.id,
    },
    select: {
      friendProfile: true,
      status: true,
    },
  });

  return {
    props: {
      profile,
      conversations,
      friends,
    },
  };
};

export default function HomePage({
  profile,
  conversations,
  servers,
  friends,
}: {
  profile: Profile;
  conversations: IConversationWithMessages[];
  servers: Server[];
  friends: Friend[];
}) {
  console.log(profile);
  const [view, setView] = useState("servers");
  const [convo, setConvo] = useState<string>("");
  // const userCtx = useContext(UserContext);

  useEffect(() => {
    const pusherClient = new client("99e512a0e34c2dc7612d", {
      cluster: "us2",
      channelAuthorization: {
        transport: "ajax",
        endpoint: "http://localhost:3000/api/pusher/auth",
        params: {
          user_id: profile.id,
        },
      },
    });

    pusherClient.subscribe("presence-quickstart");
  }, []);

  const updateConvo = (conversationId: string) => {
    setConvo(conversationId);
  };

  if (!profile) return <div />;

  return (
    <div className="flex h-screen bg-slate-600 pb-20">
      <SideNav
        initialConversations={conversations}
        convo={convo}
        profile={profile}
        setConvo={updateConvo}
        setView={setView}
        view={view}
      />

      <div
        className={`scroll mx-auto h-screen w-full overflow-y-auto ${styles.scroll}`}
      >
        {view === "servers" && (
          <div className="flex flex-col gap-12 p-4">
            <>
              <ServerList
                servers={servers}
                userId={profile.userId}
                email={profile.username}
              />
              <Invitations invitations={invitations} />
            </>
          </div>
        )}
        {view === "friends" && (
          <FriendsView
            setConvo={updateConvo}
            setView={(view: string) => setView(view)}
            initialFriends={friends}
            profileId={profile.id}
          />
        )}
        {view === "chat" && convo && (
          <ChatView
            profileId={profile.id}
            convo={convo}
            setConvo={updateConvo}
            setView={(view: string) => setView(view)}
            friends={friends}
          />
        )}
      </div>
    </div>
  );
}
