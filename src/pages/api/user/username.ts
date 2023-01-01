import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, userId } = req.body as { username: string; userId: string };
  if (!userId || !username) {
    res.status(500);
    return;
  }

  try {
    await prisma.user.update({ where: { id: userId }, data: { username } });
    await prisma.profile.create({ data: { userId } });
    return res.status(200).json({ ok: true, error: "" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, error: err });
  }
}
