import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db/client";
import { Input } from "postcss";
export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  profileExists: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      const profile = await prisma.profile.findUnique({
        where: { email: input.email },
      });

      if (profile) {
        return { ok: true, exists: true };
      } else {
        return { ok: true, exists: false };
      }
    }),
});
