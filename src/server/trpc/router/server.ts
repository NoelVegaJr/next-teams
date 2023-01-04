import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { Members } from "pusher-js";
import { s3FileUpload } from "@/utils/fileUpload";
import WorkspaceList from "@/components/Servers/Workspaces/Workspace/WorkspaceList";

const bucketBaseUrl = "https://codeforktestbucket.s3.amazonaws.com/";

export const serverRouter = router({
  create: publicProcedure
    .input(
      z.object({ name: z.string(), image: z.string(), profileId: z.string() })
    )
    .mutation(async ({ input }) => {
      const { name, image, profileId } = input;

      try {
        const newServer = await prisma.server.create({
          data: {
            name,
            image: "/defaultserver.png",
            members: { createMany: { data: { profileId } } },
          },
        });

        if (image === "/defaultserver.png") return newServer;

        const server = await prisma.server.update({
          where: {
            id: newServer.id,
          },
          data: {
            image: bucketBaseUrl + newServer.id + "_" + image,
          },
        });
        return server;
      } catch (error) {}
    }),
  getAllByProfileId: publicProcedure
    .input(z.object({ profileId: z.string() }))
    .query(async ({ input }) => {
      const { profileId } = input;
      const data = await prisma.server.findMany({
        where: { members: { some: { profileId } } },
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
      });
      console.log(data);
      return data;
    }),
  getServerById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      try {
        const server = await prisma.server.findUnique({
          where: {
            id,
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

        return server;
      } catch (err) {
        console.log(err);
      }
    }),
  createWorkspace: publicProcedure
    .input(
      z.object({
        serverId: z.string(),
        profileId: z.string(),
        name: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { serverId, name, image, profileId } = input;

      const newWorkspace = await prisma.workspace.create({
        data: {
          name,
          serverId,
          image: "/defaultserver.png",
          members: { createMany: { data: { profileId } } },
          channels: {
            create: {
              name: "General",
              members: { createMany: { data: { profileId } } },
            },
          },
        },
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
      });

      if (image === "/defaultserver.png") return newWorkspace;

      const workspace = await prisma.workspace.update({
        where: {
          id: newWorkspace.id,
        },
        data: {
          image: bucketBaseUrl + newWorkspace.id + "_" + image,
        },
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
      });
      return workspace;
    }),
  createChannel: publicProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        name: z.string(),
        profileId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { workspaceId, name, profileId } = input;

      await prisma.workspaceChannel.create({
        data: {
          workspaceId,
          name,
          members: { createMany: { data: { profileId } } },
        },
      });
    }),
  getWorkspaceById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      try {
        const workspace = await prisma.workspace.findUnique({
          where: {
            id,
          },
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
        });
        return workspace;
      } catch (error) {
        console.log(error);
      }
    }),
  listWorkspacesByServerId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const workspaces = await prisma.workspace.findMany({
          where: {
            serverId: id,
          },
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
        });
        return workspaces;
      } catch (error) {}
    }),
  listChannelsByWorkspaceId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const workspaces = await prisma.workspaceChannel.findMany({
          where: {
            workspaceId: id,
          },
          include: {
            _count: {
              select: {
                members: true,
              },
            },
          },
        });
        return workspaces;
      } catch (error) {}
    }),
  newInvitationLinkByServerId: publicProcedure
    .input(z.object({ id: z.string(), senderProfileId: z.string() }))
    .mutation(async ({ input }) => {
      const { id, senderProfileId } = input;
      const serverMember = await prisma.serverMember.findUnique({
        where: {
          serverMemberIdentifier: { profileId: senderProfileId, serverId: id },
        },
      });
      if (!serverMember) return "";

      const invitation = await prisma.serverInvitationLink.create({
        data: { serverId: id, serverMemberId: serverMember.id },
        select: {
          id: true,
        },
      });

      return "http://localhost:3000/invitation/" + invitation.id;
    }),
  createServerMember: publicProcedure
    .input(z.object({ profileId: z.string(), serverId: z.string() }))
    .mutation(async ({ input }) => {
      const newServerMember = await prisma.serverMember.create({ data: input });

      if (newServerMember) {
        return { success: true };
      } else {
        return { success: false };
      }
    }),
});
