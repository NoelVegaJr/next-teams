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
        data: input,
      });
      return { ok: true, data: { ...profile } };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  }),
  newProject: publicProcedure
    .input(
      z.object({
        name: z.string(),
        companyId: z.string(),
        profileId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, companyId, profileId } = input;
      try {
        const project = await prisma.project.create({
          data: {
            name,
            companyId,
            contributors: { create: { profileId } },
            conversation: {
              create: { participants: { create: { profileId } } },
            },
          },
        });
        if (!project) {
          throw new Error("Unable to create project");
        }

        await prisma.taskboard.create({
          data: { projectId: project.id, name: project.name },
        });
      } catch (error) {
        console.log(error);
        return { ok: false };
      }
    }),
  getProjectById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const project = await prisma.project.findUnique({
          where: { id },
          include: {
            contributors: {
              include: {
                profile: true,
              },
            },
            taskboard: {
              include: {
                TaskLists: {
                  orderBy: { index: "asc" },
                  include: { tasks: { orderBy: { index: "asc" } } },
                },
              },
            },
            conversation: {
              include: {
                participants: { include: { profile: true } },
                messages: {
                  include: {
                    participant: { include: { profile: true } },
                  },
                },
              },
            },
          },
        });
        return { ok: true, project };
      } catch (error) {
        return { ok: false };
        console.log(error);
      }
    }),
  newTaskList: publicProcedure
    .input(z.object({ taskBoardId: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const { taskBoardId, name } = input;
      try {
        const tasklist = await prisma.taskList.create({
          data: { taskBoardId, name },
        });
        return { ok: true, tasklist };
      } catch (error) {
        console.log(error);
        return { ok: false };
      }
    }),
  newTask: publicProcedure
    .input(z.object({ taskListId: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const { taskListId, name } = input;
      try {
        const task = await prisma.task.create({
          data: { name, taskListId },
        });

        return { ok: true, task };
      } catch (error) {
        console.log(error);
        return { ok: false };
      }
    }),
  reorderTaskLists: publicProcedure
    .input(
      z.object({
        listIds: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { listIds } = input;
      for (let i = 0; i < listIds.length; i++) {
        await prisma.taskList.update({
          where: { id: listIds[i] },
          data: { index: i },
          include: {
            tasks: true,
          },
        });
      }
      return { ok: true };
    }),
  reorderTasksSameList: publicProcedure
    .input(
      z.object({
        taskIds: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { taskIds } = input;
      for (let i = 0; i < taskIds.length; i++) {
        await prisma.task.update({
          where: { id: taskIds[i] },
          data: { index: i },
        });
      }
      return { ok: true };
    }),
  reorderTasksDiffList: publicProcedure
    .input(
      z.object({
        destListId: z.string(),
        taskId: z.string(),
        taskIds: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { destListId, taskId, taskIds } = input;

      await prisma.task.update({
        where: { id: taskId },
        data: { taskListId: destListId },
      });

      for (let i = 0; i < taskIds.length; i++) {
        await prisma.task.update({
          where: { id: taskIds[i] },
          data: { index: i },
        });
      }
      return { ok: true };
    }),
});
