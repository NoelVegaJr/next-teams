import { router } from "../trpc";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { chatRouter } from "./chat";
import { companyRouter } from "./company";
import { exampleRouter } from "./example";
import { serverRouter } from "./server";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  chat: chatRouter,
  server: serverRouter,
  user: userRouter,
  company: companyRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
