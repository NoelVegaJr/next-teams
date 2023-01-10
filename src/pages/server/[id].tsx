import type { GetServerSideProps } from "next/types";
import { getSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { prisma } from "@/server/db/client";
import ServerOptionsView from "@/components/Servers/ServerOptionsView";
import WorkSpace from "@/components/Servers/Workspace/Workspace";
import ServerNav from "@/components/Servers/ServerNav";
import Stack from "@/components/UI/Stack";
import useProfileStore from "store/profile-store";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    !session?.user?.id ||
    !context.query.id ||
    typeof context.query.id !== "string"
  ) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }
  console.log("userId");
  let profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      workspaceMemberships: {
        where: {
          workspace: {
            serverId: context.query.id,
          },
        },
        select: {
          workspace: {
            include: {
              channels: {
                where: {
                  members: {
                    some: {
                      profile: {
                        userId: session.user.id,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      channelMemberships: {
        where: {
          profile: {
            userId: session.user.id,
          },
        },
        include: {
          channel: true,
        },
      },
    },
  });
  let server = await prisma.server.findUnique({
    where: { id: context.query.id },
  });

  profile = JSON.parse(JSON.stringify(profile));
  server = JSON.parse(JSON.stringify(server));

  return { props: { profile, server } };
};

export const ServerPage = ({
  profile,
  server,
}: {
  profile: any;
  server: any;
}) => {
  const profileStore = useProfileStore();
  const [view, setView] = useState("workspace");
  const serverProfileQuery = trpc.user.getServerProfile.useQuery({
    profileId: profile.id,
    serverId: server.id,
  });

  useEffect(() => {
    profileStore.set(profile);
    profileStore.setActiveWorkspace(profile.workspaceMemberships[0].workspace);
    profileStore.setServerId(server.id);
  }, []);

  useEffect(() => {
    const data = serverProfileQuery.data;
    if (data) {
      profileStore.set(data);
      if (profileStore.activeWorkspace.id) {
        const activeWorkspace = data.workspaceMemberships.find(
          (m) => m.workspace.id === profileStore.activeWorkspace.id
        )?.workspace;
        profileStore.setActiveWorkspace(activeWorkspace!);
      }
    }
  }, [serverProfileQuery.data]);

  console.log("free profile store", profileStore);
  return (
    <>
      <div className="h-screen">
        {view === "serverOptions" && (
          <ServerOptionsView
            server={server}
            close={() => setView("workspace")}
          />
        )}
        {view === "workspace" && (
          <Stack type="row" gap={0} className="h-full">
            <ServerNav setView={setView} />
            <WorkSpace />
          </Stack>
        )}
      </div>
    </>
  );
};

export default ServerPage;
