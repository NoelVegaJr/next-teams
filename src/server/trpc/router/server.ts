import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

const bucketBaseUrl = "https://codeforktestbucket.s3.amazonaws.com/";

export const serverRouter = router({
  create: publicProcedure
    .input(
      z.object({ name: z.string(), image: z.string(), profileId: z.string() })
    )
    .mutation(async ({ input }) => {
      const { name, image, profileId } = input;

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: { createMany: { data: { profileId } } },
          },
        });

        const newServer = await prisma.server.create({
          data: {
            name,
            image: "/defaultserver.png",
            members: { createMany: { data: { profileId } } },
            workspaces: {
              // create default workspace
              create: {
                name,
                image: "/defaultserver.png",
                // create initial workspace member
                members: { create: { profileId } },
                channels: {
                  // create general channel
                  create: {
                    // create initial channel member
                    members: { create: { profileId } },
                    name: "General",
                    conversationId: conversation.id,
                  },
                },
              },
            },
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

      const conversation = await prisma.conversation.create({
        data: {
          participants: { createMany: { data: { profileId } } },
        },
      });

      const newWorkspace = await prisma.workspace.create({
        data: {
          name,
          serverId,
          image: "/defaultserver.png",
          members: { createMany: { data: { profileId } } },
          channels: {
            create: {
              conversationId: conversation.id,
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

      const conversation = await prisma.conversation.create({
        data: {
          participants: { createMany: { data: { profileId } } },
        },
      });

      const newChannel = await prisma.workspaceChannel.create({
        data: {
          workspaceId,
          name,
          members: { createMany: { data: { profileId } } },
          conversationId: conversation.id,
        },
      });
      return await prisma.workspaceChannelMember.findFirst({
        where: {
          profileId,
          channelId: newChannel.id,
        },
        include: {
          channel: true,
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
  listWorkspacesByServerIdAndProfileId: publicProcedure
    .input(z.object({ id: z.string(), profileId: z.string() }))
    .query(async ({ input }) => {
      const { id, profileId } = input;
      try {
        const workspaces = await prisma.workspace.findMany({
          where: {
            serverId: id,
            members: {
              some: {
                profileId,
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
        return workspaces;
      } catch (error) {}
    }),
  listChannelsByWorkspaceId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const channels = await prisma.workspaceChannel.findMany({
          where: {
            workspaceId: id,
          },
          include: {
            members: {
              select: {
                id: true,
              },
              where: {
                exited: false,
              },
            },
          },
        });
        return channels;
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
      const { profileId, serverId } = input;

      try {
        const server = await prisma.server.findUnique({
          where: { id: input.serverId },
          include: {
            workspaces: {
              include: {
                channels: {
                  orderBy: {
                    createdAt: "asc",
                  },
                  take: 1,
                },
              },
              orderBy: {
                createdAt: "asc",
              },
              take: 1,
            },
          },
        });

        if (!server) return;

        const defaultWorkspace = server.workspaces[0];
        const defaultChannel = defaultWorkspace.channels[0];

        await prisma.serverMember.create({
          data: { profileId, serverId },
        });
        await prisma.workspaceMember.create({
          data: { workspaceId: defaultWorkspace?.id as string, profileId },
        });
        await prisma.workspaceChannelMember.create({
          data: { channelId: defaultChannel.id as string, profileId },
        });
        await prisma.conversationParticipant.create({
          data: { conversationId: defaultChannel.conversationId, profileId },
        });
        return { success: true };
      } catch {
        return { success: false };
      }
    }),
  createWorkspaceMember: publicProcedure
    .input(z.object({ profileId: z.string(), workspaceId: z.string() }))
    .mutation(async ({ input }) => {
      const { profileId, workspaceId } = input;

      try {
        const generalChannel = await prisma.workspaceChannel.findFirst({
          where: { name: "General", workspaceId },
        });
        if (!generalChannel) throw Error("General channel missing");

        // create workspace membership
        await prisma.workspaceMember.create({
          data: { workspaceId, profileId },
        });

        // create channel membership to the # General channel
        await prisma.workspaceChannelMember.create({
          data: { channelId: generalChannel.id, profileId },
        });

        // create conversation participant for the # General channel conversation
        await prisma.conversationParticipant.create({
          data: { conversationId: generalChannel.conversationId, profileId },
        });

        return { success: true };
      } catch {
        return { success: false };
      }
    }),
  createWorkspaceChannelMember: publicProcedure
    .input(z.object({ profileId: z.string(), channelId: z.string() }))
    .mutation(async ({ input }) => {
      const { profileId, channelId } = input;

      try {
        // create workspace membership
        const existingWorkspaceChannelMembership =
          await prisma.workspaceChannelMember.findFirst({
            where: { channelId, profileId },
          });

        if (existingWorkspaceChannelMembership) {
          await prisma.workspaceChannelMember.update({
            where: { id: existingWorkspaceChannelMembership.id },
            data: { exited: false },
          });
        } else {
          const newWorkspaceChannelMember =
            await prisma.workspaceChannelMember.create({
              data: { channelId, profileId },
              include: { channel: true },
            });

          await prisma.conversationParticipant.create({
            data: {
              conversationId: newWorkspaceChannelMember.channel.conversationId,
              profileId,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }),
  getChannelById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const channel = await prisma.workspaceChannel.findUnique({
        where: { id },

        include: {
          _count: {
            select: {
              members: true,
            },
          },
          members: {
            include: {
              profile: true,
            },
          },
        },
      });
      return channel;
    }),
  getChannelConversation: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const conversation = await prisma.workspaceChannel.findUnique({
        where: { id },
        select: {
          conversation: {
            include: {
              participants: {
                include: {
                  profile: true,
                },
              },
              messages: {
                include: { participant: { include: { profile: true } } },
              },
            },
          },
        },
      });

      return conversation?.conversation;
    }),
  getServerMembersById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      try {
        const members = await prisma.serverMember.findMany({
          where: { serverId: id },
          include: {
            profile: true,
          },
        });
        return members;
      } catch (error) {
        console.log(error);
      }
    }),
  getServerMembersNotInWorkspace: publicProcedure
    .input(z.object({ serverId: z.string(), workspaceId: z.string() }))
    .query(async ({ input }) => {
      const { serverId, workspaceId } = input;

      try {
        const serverMembersNotInWorkspace = await prisma.serverMember.findMany({
          where: {
            serverId,
            profile: {
              workspaceMemberships: { every: { NOT: { workspaceId } } },
            },
          },
          select: {
            profile: true,
          },
        });

        return serverMembersNotInWorkspace;
      } catch (error) {
        console.log(error);
      }
    }),
  exitChannelById: publicProcedure
    .input(z.object({ channelMemberId: z.string() }))
    .mutation(async ({ input }) => {
      const { channelMemberId } = input;
      await prisma.workspaceChannelMember.update({
        where: { id: channelMemberId },
        data: { exited: true },
      });
    }),
});
