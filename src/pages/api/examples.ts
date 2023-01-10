import { type NextApiRequest, type NextApiResponse } from "next";
import pusher from "@/utils/pusher";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("incoming");
  console.log(req.body);
  await pusher.trigger("stats", "message", req.body);

  res.status(200).send("hello");
};

export default examples;
