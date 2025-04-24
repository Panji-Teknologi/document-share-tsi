import { z } from "zod";

// == client ==
// can upload, and delete document

// == lembaga sertifikasi ==
// can everything

// == auditor ==
// only view document

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const roleRouter = createTRPCRouter({
  getRoles: publicProcedure.query(({ ctx }) => {
    return ctx.db.role.findMany({});
  }),

  createRole: publicProcedure.input(z.object({
    name: z.string(),
    code: z.string(),
  })).mutation(({ ctx, input }) => {

    return ctx.db.role.create({
      data: {
        name: input.name,
        code: input.code,
      }
    })
  })
})