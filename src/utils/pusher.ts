import Pusher from "pusher";
import client from "pusher-js";
const pusher = new Pusher({
  appId: process.env.PUSHER_APPID as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.PUSHSER_SECRET as string,
  cluster: "us2",
  useTLS: true,
});

export const pusherClient = new client("99e512a0e34c2dc7612d", {
  cluster: "us2",
});

export default pusher;
