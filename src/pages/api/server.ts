import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  if (!id) {
    res.status(500);
    return;
  }

  console.log("server api endpoint: ", id);
  try {
    const server = await prisma.server.findUnique({
      where: { id },
      include: {
        workspace: {
          include: {
            channels: { include: { members: { include: { user: true } } } },
          },
        },
      },
    });
    res.status(200).json({ server });
    return;
  } catch (err) {
    res.status(500);
    return;
  }
}
