import { router } from "../trpc";
import { authRouter } from "./auth";
import { chatRouter } from "./chat";
import { exampleRouter } from "./example";
import { serverRouter } from "./server";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  chat: chatRouter,
  server: serverRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
