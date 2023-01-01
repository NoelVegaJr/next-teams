import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { Members } from "pusher-js";

interface IServer {
  id: string;
  name: string;
  members: number;
  image: string;
}

export const serverRouter = router({
  create: publicProcedure
    .input(
      z.object({ name: z.string(), image: z.string(), userId: z.string() })
    )
    .mutation(async ({ input }) => {
      const { name, image, userId } = input;

      try {
        await prisma.server.create({
          data: {
            name,
            image,
            members: { createMany: { data: { userId } } },
          },
        });
        return { ok: true, error: "" };
      } catch (error) {
        return { ok: false, error: error };
      }
    }),
  getAllByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      const data = await prisma.server.findMany({
        where: { members: { some: { userId } } },
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
          where: { id },
          include: {
            workspace: {
              include: {
                channels: { include: { members: { include: { user: true } } } },
              },
            },
          },
        });

        return server;
      } catch (err) {
        console.log(err);
        return null;
      }
    }),
  createWorkspace: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        image: z.string().nullish(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, image, userId } = input;

      const newWorkspace = await prisma.workspace.create({
        data: {
          name,
          serverId: id,
          image: image ?? "/defaultserver.png",
          members: { createMany: { data: { userId } } },
          channels: {
            create: {
              name: "General",
              members: { createMany: { data: { userId } } },
            },
          },
        },
      });

      return newWorkspace;
    }),
  createChannel: publicProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        name: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { workspaceId, name, userId } = input;

      await prisma.workspaceChannel.create({
        data: {
          workspaceId,
          name,
          members: { createMany: { data: { userId } } },
        },
      });
    }),
});
