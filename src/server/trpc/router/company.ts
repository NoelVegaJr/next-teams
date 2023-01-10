import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { FormSchema } from "@/types/inquiry";

export const companyRouter = router({
  newInquiry: publicProcedure.input(FormSchema).mutation(async ({ input }) => {
    try {
      await prisma.inquiry.create({
        data: input,
      });
      await prisma.inquiry.create({ data: input });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }),
  new: publicProcedure
    .input(
      z.object({
        name: z.string(),
        country: z.string(),
        address: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const companyExists = await prisma.company.findUnique({
          where: {
            name: input.name,
          },
        });

        if (companyExists) throw new Error("Company name already exists");
        const newCompany = await prisma.company.create({ data: input });

        return { ok: true, newCompany };
      } catch {
        return { ok: false, message: "could not create company" };
      }
    }),
});
