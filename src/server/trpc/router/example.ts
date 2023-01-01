import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  browserClose: publicProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async ({ input }) => {
      console.log("browser closed");
    }),
});
