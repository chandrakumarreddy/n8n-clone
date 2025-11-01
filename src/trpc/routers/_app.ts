import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
  getWorkFlows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "chandra@orbtishift.ai",
      },
    });
    return { success: true, message: "Job queued" };
  }),
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/execute-ai",
    });
  }),
});

export type AppRouter = typeof appRouter;
