import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";
import { env } from "../../env/server.mjs";
import { NextApiRequest, NextApiResponse } from "next";

const s3Client = new AWS.S3({
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_ACCESS_KEY,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    console.log(files.image[0].originalFilename);

    if (!files) {
      res.status(400).send("No file uploaded");
      return;
    }

    try {
      return s3Client.putObject(
        {
          Bucket: "codeforktestbucket",
          Key: files.image[0].originalFilename,
          Body: fs.createReadStream(files.image[0].filepath),
        },
        async () => res.status(201).send("File Uploaded")
      );
    } catch (e) {
      console.log(e);
      res.status(500).send("Error uploading file");
    }
  });
}
