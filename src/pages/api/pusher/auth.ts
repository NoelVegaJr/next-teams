import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "../../../utils/pusher";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const user_id = req.body.user_id;
  const user_info = req.body.user_info;

  const presenceData = {
    user_id,
    user_info: {
      userId: user_id,
      // username: user_info.username,
    },
  };
  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
  res.send(authResponse);
}
