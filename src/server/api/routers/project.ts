import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure.input(z.object({
    folderId: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.project.create({
      data: {
        folderId: input.folderId
      }
    })
  }),

  getProject: protectedProcedure.input(z.object({
    folderId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.project.findMany({
      where: {
        folderId: input.folderId
      },
      include: {
        auditors: true
      }
    })
  })
})