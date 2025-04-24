import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const documentRouter = createTRPCRouter({
  documentUpload: protectedProcedure.input(z.object({
    url: z.string(),
    folderId: z.string(),
    userId: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.document.create({
      data: {
        url: input.url,
        folderId: input.folderId,
        userId: input.userId,
      }
    })
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.document.findMany({
      include: {
        folder: true,
        user: true
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  getDocumentsRoot: protectedProcedure.query(({ ctx }) => {
    return ctx.db.document.findMany({
      include: {
        folder: true,
        user: true
      },
      where: {
        folder: {
          isRoot: true
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  getDocumentsRootByUserId: protectedProcedure.input(z.object({
    userId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.document.findMany({
      include: {
        folder: true,
        user: true
      },
      where: {
        userId: input.userId,
        folder: {
          isRoot: true
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  getDocuments: protectedProcedure.input(z.object({
    folderId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.document.findMany({
      where: {
        folderId: input.folderId,
      },
      include: {
        folder: true,
        user: true
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  getDocumentsByUserId: protectedProcedure.input(z.object({
    folderId: z.string(),
    userId: z.string()
  })).query(({ ctx, input }) => {
    return ctx.db.document.findMany({
      where: {
        folderId: input.folderId,
        userId: input.userId,
      },
      include: {
        folder: true,
        user: true
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  deleteDocument: protectedProcedure.input(z.object({
    documentId: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.document.delete({
      where: {
        id: input.documentId
      },
    })
  })
})