import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { env } from "../../env/server.mjs";

const s3 = new S3({
  region: env.S3_REGION,
  accessKeyId: env.S3_ACCESS_KEY,
  secretAccessKey: env.S3_SECRET_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, type } = req.body;

  try {
    const fileParams = {
      Bucket: "codeforktestbucket",
      Key: name,
      Expires: 6000,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    return res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
}
