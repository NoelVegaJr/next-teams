import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

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
      const assignedServers = await prisma.server.findMany({
        where: { members: { some: { userId } } },
      });
      console.log(assignedServers);
      return assignedServers;
    }),
});
