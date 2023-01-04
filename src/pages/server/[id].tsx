import type { GetServerSideProps } from "next/types";
import { getSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { prisma } from "@/server/db/client";
import type { IServer, IWorkspace } from "@/types/types";
import type { Profile } from "@prisma/client";
import ServerOptionsView from "@/components/Servers/ServerOptionsView";
import WorkSpace from "@/components/Servers/Workspaces/Workspace/Workspace";
import NewWorkspaceModal from "@/components/Servers/Workspaces/Workspace/NewWorkspaceModal";
import ServerNav from "@/components/Servers/ServerNav";
import Stack from "@/components/UI/Stack";

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
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }
  let server = await prisma.server.findUnique({
    where: {
      id: context.query.id,
    },
    include: {
      workspaces: {
        include: {
          _count: {
            select: {
              channels: true,
              members: true,
            },
          },
          channels: {
            include: {
              _count: {
                select: {
                  members: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          members: true,
          workspaces: true,
        },
      },
    },
  });
  server = JSON.parse(JSON.stringify(server));
  if (!server?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }
  return { props: { server, profile } };
};

export const ServerPage = ({
  server,
  profile,
}: {
  server: IServer;
  profile: Profile;
}) => {
  const [view, setView] = useState("workspace");
  const [newWorkspaceModal, setNewWorkspaceModal] = useState(false);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [workspaces, setWorkspaces] = useState(server.workspaces);
  const [workspace, setWorkspace] = useState(workspaces[0]);

  const worspaceListQuery = trpc.server.listWorkspacesByServerId.useQuery({
    id: server.id,
  });

  const worspaceQuery = trpc.server.getWorkspaceById.useQuery({
    id: workspace?.id ?? "",
  });

  useEffect(() => {
    if (worspaceListQuery.data) {
      setWorkspaces(worspaceListQuery.data);
    }
  }, [worspaceListQuery.data]);

  useEffect(() => {
    if (worspaceQuery.data) {
      setWorkspace(worspaceQuery.data);
    }
  }, [worspaceQuery.data]);

  useEffect(() => {
    setDocumentLoaded(true);
  }, []);

  return (
    <>
      {workspace && (
        <div className="h-screen">
          {view === "serverOptions" && (
            <ServerOptionsView
              profileId={profile.id}
              server={server}
              close={() => setView("workspace")}
            />
          )}
          {view === "workspace" && (
            <Stack type="row" gap={0} className="h-full">
              <ServerNav
                serverId={server.id}
                workspaces={workspaces}
                setWorkspace={setWorkspace}
                openWorkspaceModal={() => setNewWorkspaceModal(true)}
                setView={setView}
              />

              <WorkSpace workspace={workspace} profileId={profile.id} />
            </Stack>
          )}
        </div>
      )}

      {/* New Server Prompt to create a workspace */}
      {((!workspace && documentLoaded) || newWorkspaceModal) && (
        <>
          {!workspace && (
            <div className="fixed top-0 h-screen w-full bg-slate-700" />
          )}
          <NewWorkspaceModal
            serverId={server.id}
            profileId={profile.id}
            workspaceCount={workspaces.length}
            setWorkspace={(workspace: IWorkspace) => setWorkspace(workspace)}
            close={() => {
              setNewWorkspaceModal(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default ServerPage;
