import Pusher from "pusher";
import client from "pusher-js";

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.PUSHSER_SECRET as string,
  cluster: "us2",
  useTLS: true,
});

// export const pusherClient = new client("99e512a0e34c2dc7612d", {
//   cluster: "us2",
//   channelAuthorization: {
//     transport: "ajax",
//     endpoint: "http://localhost:3000/api/pusher/auth",
//   },
// });

export default pusher;

// import { PrismaClient } from "@prisma/client";

// import { env } from "../../env/server.mjs";

// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// export const prisma =
//   global.prisma ||
//   new PrismaClient({
//     log:
//       // env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//       env.NODE_ENV === "development" ? ["error"] : ["error"],
//   });

// if (env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }
