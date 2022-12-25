import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { router, publicProcedure } from "../trpc";
import { S3Client, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  region: env.S3_REGION,
});

const command = new 

export const s3Router = router({
  push: publicProcedure.input().mutation(async ({ input }) => {
    return {};
  }),
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
