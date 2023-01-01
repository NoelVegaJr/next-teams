import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import pusher from "../../../utils/pusher";
import { prisma } from "../../db/client";

export const chatRouter = router({
  push: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
        participantId: z.string(),
        text: z.string(),
        user: z.object({
          id: z.string(),
          username: z.string(),
          image: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { text, conversationId, participantId } = input;

      try {
        const message = await prisma.message.create({
          data: {
            text,
            conversationId,
            participantId,
          },
          select: {
            id: true,
            conversationId: true,
            date: true,
            text: true,
            participant: {
              select: {
                id: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                    image: true,
                    status: true,
                  },
                },
              },
            },
          },
        });

        if (!message) return {};
        await pusher.trigger("friend", "message", message);
      } catch (err) {
        console.log(err);
      }
    }),
  findConversation: publicProcedure
    .input(z.object({ userIds: z.string().array() }))
    .mutation(async ({ input }) => {
      const { userIds } = input;
      console.log("finding conversation", "for", userIds);
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            every: {
              userId: {
                in: userIds,
              },
            },
          },
        },
        select: {
          id: true,
          participants: { select: { userId: true } },
        },
      });

      let existingConversationId;
      conversations.map((c) => {
        const ids = c.participants.map((p) => p.userId);
        let count = 0;
        ids.forEach((id) => {
          if (userIds.includes(id)) {
            count++;
          }

          if (count === userIds.length) {
            existingConversationId = c;
          }
        });
      });

      if (!existingConversationId) {
        const newConversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: userIds.map((id) => {
                  return { userId: id };
                }),
              },
            },
          },
        });

        return newConversation;
      }

      return existingConversationId;
    }),
  listConversations: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      if (!userId) return {};
      try {
        const conversations = await prisma.conversation.findMany({
          where: {
            participants: {
              some: {
                userId,
              },
            },
          },
          include: {
            participants: {
              include: {
                user: true,
              },
            },
          },
        });
        return conversations;
      } catch (error) {
        console.log(error);
      }
    }),
  getConversationById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      try {
        const conversation = await prisma.conversation.findUnique({
          where: {
            id,
          },
          include: {
            messages: {
              select: {
                conversationId: true,
                id: true,
                date: true,
                text: true,
                participant: {
                  select: {
                    id: true,
                    user: {
                      select: {
                        id: true,
                        username: true,
                        image: true,
                        status: true,
                      },
                    },
                  },
                },
              },
            },
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    image: true,
                    status: true,
                    name: true,
                    emailVerified: true,
                    email: true,
                  },
                },
              },
            },
          },
        });

        return conversation;
      } catch (error) {
        console.log(error);
      }
    }),
});
