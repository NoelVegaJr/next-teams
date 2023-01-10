import { string, z } from "zod";
import { prisma } from "../../db/client";
import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  getProfile: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      try {
        const profile = await prisma.profile.findUnique({
          where: { userId },
          include: {
            serverMemberships: true,
          },
        });

        if (!profile) return;

        const conversations = await prisma.conversation.findMany({
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

        return { ...profile, conversations };
      } catch (err) {
        console.log(err);
      }
    }),

  createProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        username: z.string(),
        avatar: z.string(),
        banner: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const profile = await prisma.profile.create({
          data: input,
        });

        return { profile, success: true };
      } catch (error) {
        return { success: false };
      }
    }),

  sendFriendRequest: publicProcedure
    .input(z.object({ username: z.string(), senderProfileId: z.string() }))
    .mutation(async ({ input }) => {
      const { username, senderProfileId } = input;

      try {
        const recipient = await prisma.profile.findUnique({
          where: { username },
        });

        if (!recipient) return { error: "user not found" };

        const friendRequest = await prisma.friendship.create({
          data: {
            profileId: senderProfileId,
            friendId: recipient.id,
            status: "pending",
          },
          include: {
            friendProfile: true,
          },
        });
        // 2nd row for relationship purposes
        await prisma.friendship.create({
          data: {
            profileId: recipient.id,
            friendId: senderProfileId,
            status: "recieved",
          },
        });

        return friendRequest;
      } catch (err) {
        return { error: "application error :/" };
      }
    }),
  getStaffByCompanyId: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(async ({ input }) => {
      const { companyId } = input;
      try {
        const members = await prisma.profile.findMany({
          where: {
            companyId: "1",
          },
        });
        return { ok: true, members };
      } catch (error) {
        console.log(error);
        return { ok: false, members: [] };
      }
    }),
  deleteFriendRequest: publicProcedure
    .input(z.object({ profileId: z.string(), friendProfileId: z.string() }))
    .mutation(async ({ input }) => {
      const { profileId, friendProfileId } = input;

      try {
        await prisma.friendship.deleteMany({
          where: {
            profileId,
            friendId: friendProfileId,
          },
        });
        await prisma.friendship.deleteMany({
          where: {
            profileId: friendProfileId,
            friendId: profileId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  acceptFriendRequest: publicProcedure
    .input(z.object({ profileId: z.string(), friendProfileId: z.string() }))
    .mutation(async ({ input }) => {
      const { profileId, friendProfileId } = input;

      try {
        await prisma.friendship.updateMany({
          where: {
            profileId,
            friendId: friendProfileId,
          },
          data: {
            status: "friends",
          },
        });
        await prisma.friendship.updateMany({
          where: {
            profileId: friendProfileId,
            friendId: profileId,
          },
          data: {
            status: "friends",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  unfriend: publicProcedure
    .input(z.object({ profileId: z.string(), friendProfileId: z.string() }))
    .mutation(async ({ input }) => {
      const { profileId, friendProfileId } = input;

      try {
        await prisma.friendship.deleteMany({
          where: { profileId, friendId: friendProfileId },
        });

        await prisma.friendship.deleteMany({
          where: { profileId: friendProfileId, friendId: profileId },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  updateStatus: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        status: z.enum(["online", "offline", "away", "sleeping"]),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, status } = input;

      try {
        await prisma.profile.update({
          where: { userId: userId },
          data: { status },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  getServerProfile: publicProcedure
    .input(z.object({ serverId: z.string(), profileId: z.string() }))
    .query(async ({ input }) => {
      const { serverId, profileId } = input;
      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          workspaceMemberships: {
            where: {
              workspace: {
                serverId,
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
                            id: profileId,
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
              profileId,
            },
            include: {
              channel: true,
            },
          },
        },
      });
      return profile;
    }),
});
