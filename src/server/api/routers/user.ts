import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.input(z.object({
    email: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: {
        email: input.email
      },
      include: {
        role: true,
        projects: true
      }
    })
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      include: {
        role: true
      }
    })
  }),

  getAuditors: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        role: {
          code: 'auditor'
        }
      },
      include: {
        role: true,
        projects: true
      },
      orderBy: {
        name: 'asc'
      }
    })
  }),

  getClients: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        role: {
          code: 'client'
        }
      },
      include: {
        role: true,
        folders: true
      },
      orderBy: {
        name: 'asc'
      }
    })
  }),

  connectWithProject: protectedProcedure.input(z.object({
    id: z.string(),
    projectId: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.user.update({
      where: {
        id: input.id
      },
      data: {
        projects: {
          connect: [{ id: input.projectId }]
        }
      }
    })
  }),

  disconnectWithProject: protectedProcedure.input(z.object({
    id: z.string(),
    projectId: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.user.update({
      where: {
        id: input.id
      },
      data: {
        projects: {
          disconnect: { id: input.projectId }
        }
      }
    })
  }),

  deleteUser: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.user.delete({
      where: {
        id: input.id
      }
    })
  })
})