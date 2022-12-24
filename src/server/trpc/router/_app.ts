import { router } from "../trpc";
import { authRouter } from "./auth";
import { chatRouter } from "./chat";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
