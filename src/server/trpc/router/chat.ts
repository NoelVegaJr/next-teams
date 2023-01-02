import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import pusher from "../../../utils/pusher";
import { prisma } from "../../db/client";
import { profile } from "console";

export const chatRouter = router({
  push: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
        participantId: z.string(),
        text: z.string(),
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
                profile: {
                  select: {
                    id: true,
                    username: true,
                    avatar: true,
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
    .input(z.object({ profileIds: z.string().array() }))
    .mutation(async ({ input }) => {
      const { profileIds } = input;
      console.log(profileIds);
      try {
        const existingConversations = await prisma.conversation.findMany({
          where: {
            participants: {
              every: {
                profileId: {
                  in: profileIds,
                },
              },
            },
          },
          select: {
            id: true,
            participants: {
              include: {
                profile: true,
              },
            },
          },
        });

        const foundConversation = existingConversations
          .filter((c) => {
            return c.participants.length === profileIds.length;
          })
          .filter((c) => {
            return c.participants.every((p) =>
              profileIds.includes(p.profileId)
            );
          });

        // const foundConversation = existingConversations.filter((c) => {
        //   return c.participants.every((p) => profileIds.includes(p.profile.id));
        // });

        console.log("FOUND CONVERSATION: ", foundConversation);

        if (foundConversation.length) {
          return foundConversation[0];
        }

        const newConversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: profileIds.map((profileId) => {
                  return { profileId };
                }),
              },
            },
          },
          select: {
            id: true,
            participants: {
              include: {
                profile: true,
              },
            },
          },
        });

        return newConversation;

        // let foundConversation;
        // existingConversations.forEach(conversation => {
        //   let matchCount = 0
        //   conversation.participants.forEach((participant, index) => {
        //     if(profileIds.includes(participant.profile.id)){
        //       matchCount++
        //     }
        //     if(matchCount === profileIds.length && index - 1 === conversation.participants.length ){
        //       foundConversation = conversation

        //     }
        //   })
        // })
      } catch (error) {}
    }),
  listConversations: publicProcedure
    .input(z.object({ profileId: z.string() }))
    .query(async ({ input }) => {
      const { profileId } = input;
      try {
        const conversations = await prisma.conversation.findMany({
          where: {
            participants: {
              some: {
                profileId: profileId,
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
                conversationId: true,
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
                    profile: true,
                  },
                },
              },
            },
            participants: {
              select: {
                id: true,
                profile: true,
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
