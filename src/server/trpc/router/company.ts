import { z } from "zod";
import sendgrid from "@sendgrid/mail";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { FormSchema, NewUserSchema } from "@/types/inquiry";
export const companyRouter = router({
  newInquiry: publicProcedure.input(FormSchema).mutation(async ({ input }) => {
    const { companyName, address, name, email, phone } = input;
    console.log(input);
    try {
      await prisma.inquiry.create({
        data: { ...input, status: "pending" },
      });
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);
      const msg = {
        to: "codeforkdev@gmail.com",
        from: "noeljr126@gmail.com",
        subject: `New Inquiry: ${companyName}`,
        text: "body",
        html: `<div>
      <p><strong>Name:<strong> ${name}</p>
      <p><strong>Email:<strong> ${email}</p>
      <p><strong>Phone:<strong> ${phone}</p>
      <p><strong>Address:<strong> ${address}</p>
    </div>`,
      };
      await sendgrid.send(msg);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }),
  getInquiries: publicProcedure.query(async () => {
    try {
      const inqueries = await prisma.inquiry.findMany();
      return { ok: true, inqueries };
    } catch (error) {
      return { ok: false };
    }
  }),
  new: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        phone: z.string(),
        inquiryId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { inquiryId, ...company } = input;
      try {
        await prisma.inquiry.update({
          where: { id: inquiryId },
          data: { status: "approved" },
        });

        const companyExists = await prisma.company.findUnique({
          where: {
            name: input.name,
          },
        });

        if (companyExists) throw new Error("Company name already exists");
        const newCompany = await prisma.company.create({ data: company });

        return { ok: true, newCompany };
      } catch {
        return { ok: false, message: "could not create company" };
      }
    }),

  newUser: publicProcedure.input(NewUserSchema).mutation(async ({ input }) => {
    try {
      const profile = await prisma.profile.create({
        data: {
          companyId: "1",
          ...input,
        },
      });
      return { ok: true, data: { ...profile } };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  }),
});
