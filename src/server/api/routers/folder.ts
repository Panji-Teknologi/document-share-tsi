import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const folderRouter = createTRPCRouter({
  createFolder: protectedProcedure.input(z.object({
    name: z.string(),
    userId: z.string(),
    isRoot: z.boolean(),
    startDate: z.date(),
    endDate: z.date()
  })).mutation(({ ctx, input }) => {
    return ctx.db.folder.create({
      data: {
        name: input.name,
        userId: input.userId,
        isRoot: input.isRoot,
        startDate: input.startDate,
        endDate: input.endDate
      }
    })
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.folder.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        documents: true,
        project: true
      }
    })
  }),

  getNonRoot: protectedProcedure.query(({ ctx }) => {
    return ctx.db.folder.findMany({
      where: {
        isRoot: false
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        documents: true,
      }
    })
  }),

  getNonRootByUserId: protectedProcedure.input(z.object({
    userId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.folder.findMany({
      where: {
        userId: input.userId,
        isRoot: false
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        documents: true,
      }
    })
  }),

  getRootFolder: protectedProcedure.query(({ ctx }) => {
    return ctx.db.folder.findFirst({
      where: {
        isRoot: true,
      }
    })
  }),

  getRootFolderByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.db.folder.findFirst({
      where: {
        isRoot: true,
        userId: ctx.session.user.id
      }
    })
  }),

  getFolderById: protectedProcedure.input(z.object({
    id: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.folder.findMany({
      where: {
        id: input.id
      },
      include: {
        user: true,
        documents: true,
      }
    })
  }),

  getFoldersByIds: protectedProcedure.input(z.object({
    folderIds: z.array(z.string())
  })).query(({ ctx, input }) => {
    return ctx.db.folder.findMany({
      where: {
        id: {
          in: input.folderIds
        }
      },
      include: {
        user: true,
        documents: true,
      }
    })
  }),

  getFolderByUserId: protectedProcedure.input(z.object({
    userId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.folder.findMany({
      where: {
        userId: input.userId
      },
      include: {
        user: true,
        documents: true,
      }
    })
  }),

  deleteFolder: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.folder.delete({
      where: {
        id: input.id
      }
    })
  })
})