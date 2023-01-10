import * as React from "react";
import type { NextPageContext } from "next";
import { prisma } from "@/server/db/client";
import Tile from "@/components/UI/Tile";
import Avatar from "@/components/UI/Avatar";
import StatusBubble from "@/components/UI/StatusBubble";
import { getSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;
  const session = await getSession(ctx);
  let profile;
  if (typeof id !== "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }
  if (session?.user?.id) {
    profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });
  }

  let invitation = await prisma.serverInvitationLink.findUnique({
    where: { id },
    include: {
      server: {
        select: {
          id: true,
          name: true,
          image: true,
          _count: {
            select: {
              members: true,
            },
          },
        },
      },
      profile: {
        select: {
          profile: {
            select: {
              name: true,
              status: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  if (!invitation) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  const threshold = invitation.createdAt.getTime() + 1000 * 60 * 60;

  if (new Date().getTime() < threshold) {
    invitation = JSON.parse(JSON.stringify(invitation));
    return { props: { ...invitation, isValid: true, myProfile: profile } };
  } else {
    return {
      props: { isValid: false, myProfile: profile },
    };
  }
};

const InvitationPage = (props: any) => {
  console.log(props);
  const router = useRouter();
  const addMemberMutation = trpc.server.createServerMember.useMutation();

  const acceptInvitationHandler = async () => {
    const response = await addMemberMutation.mutateAsync({
      profileId: props.myProfile.id,
      serverId: props.serverId,
    });

    if (response.success) {
      router.push("/server/" + props.server.id);
    } else {
      console.log("could not join");
      return;
    }
  };

  return (
    <>
      {props.isValid && (
        <div className="flex h-screen items-center justify-center bg-slate-700">
          <div className="flex w-2/5 flex-col gap-6 rounded-lg  p-4">
            <div className="flex flex-col items-center gap-4">
              <Tile src={props.server.image} size="5xl" />
              <p className="text-slate-300">
                {props.profile.profile.name} invited you to join
              </p>
              <p className="text-2xl font-bold text-slate-200">
                {props.server.name}
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2 rounded-xl bg-slate-800 p-1 px-4 text-slate-300">
                  <StatusBubble size="xs" status="online" position="static" />
                  <p className="">{props.server._count.members} Online</p>
                </div>
                <div className="rounded-xl bg-slate-800 p-1 px-4 text-slate-300">
                  <p className="">{props.server._count.members} Members</p>
                </div>
              </div>
            </div>
            <button
              onClick={acceptInvitationHandler}
              className="w-full rounded bg-indigo-400 px-2 py-1 font-semibold text-white drop-shadow-xl transition-all duration-200 hover:bg-indigo-500 hover:drop-shadow-none"
            >
              Accept Invite
            </button>
          </div>
        </div>
      )}
      {!props.isValid && (
        <div className="flex h-screen items-center justify-center bg-slate-700">
          <p className="font-3xl text-white">
            Oops looks like this invitation expired
          </p>
        </div>
      )}
    </>
  );
};

export default InvitationPage;
