import { z } from "zod";
import { prisma } from "../../db/client";
import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  profile: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      try {
        const profile = await prisma.profile.findUnique({
          where: { userId },
          include: {
            user: true,
            friends: {
              include: {
                friend: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                    status: true,
                  },
                },
              },
            },
            RecievingFriendRequests: {
              include: {
                sender: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            SentFriendRequests: {
              include: {
                recipient: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            servers: {
              include: {
                server: {
                  include: {
                    _count: {
                      select: {
                        members: true,
                      },
                    },
                    workspace: {
                      include: {
                        channels: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        return profile;
      } catch (err) {
        console.log(err);
      }
    }),
  sendFriendRequest: publicProcedure
    .input(z.object({ username: z.string(), senderId: z.string() }))
    .mutation(async ({ input }) => {
      const { username, senderId } = input;

      try {
        const recipient = await prisma.user.findUnique({
          where: { username },
        });

        if (!recipient?.id) {
          return;
        }
        // new friend request
        await prisma.friendRequest.create({
          data: { senderId, recipientId: recipient.id, status: "pending" },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  deleteFriendRequest: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      try {
        await prisma.friendRequest.delete({
          where: { id },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  acceptFriendRequest: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      try {
        const friendRequest = await prisma.friendRequest.findUnique({
          where: { id },
        });

        if (!friendRequest) return;
        console.log("CREATING FRIENDSHIP");

        await prisma.friendship.create({
          data: {
            user1Id: friendRequest.senderId,
            user2Id: friendRequest.recipientId,
          },
        });
        await prisma.friendship.create({
          data: {
            user2Id: friendRequest.senderId,
            user1Id: friendRequest.recipientId,
          },
        });
        await prisma.friendRequest.delete({
          where: { id },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  unfriend: publicProcedure
    .input(z.object({ userId: z.string(), friendUserId: z.string() }))
    .mutation(async ({ input }) => {
      const { userId, friendUserId } = input;

      try {
        await prisma.friendship.deleteMany({
          where: { user1Id: userId, user2Id: friendUserId },
        });
        await prisma.friendship.deleteMany({
          where: { user1Id: friendUserId, user2Id: userId },
        });
      } catch (err) {
        console.log(err);
      }
    }),
  updateStatus: publicProcedure
    .input(z.object({ userId: z.string(), status: z.string() }))
    .mutation(async ({ input }) => {
      const { userId, status } = input;

      try {
        await prisma.user.update({
          where: { id: userId },
          data: { status },
        });
      } catch (err) {
        console.log(err);
      }
    }),
});
