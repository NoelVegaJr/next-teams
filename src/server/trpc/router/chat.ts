import { procedureTypes } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import pusher from "../../../utils/pusher";

export const chatRouter = router({
  push: publicProcedure
    .input(
      z.object({
        text: z.string(),
        user: z.object({ id: z.number(), name: z.string(), image: z.string() }),
      })
    )
    .mutation(async ({ input }) => {
      const { text, user } = input;

      await pusher.trigger("test", "new-message", {
        text,
        user,
      });
    }),
});
