import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";

export const adminRouter = router({
  listAllCompanies: publicProcedure.query(async () => {
    try {
      const companies = await prisma.company.findMany();
      return { ok: true, companies };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  }),
});
