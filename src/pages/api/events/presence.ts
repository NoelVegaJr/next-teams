import { Status } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { events } = req.body;
  const { channel, name, user_id } = events[0];

  let status: Status = "offline";

  if (name === "member_added") {
    status = "online";
  } else if (name === "member_removed") {
    status = "offline";
  }
  try {
    await prisma.profile.update({
      where: {
        id: user_id,
      },
      data: { status },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200);
}
