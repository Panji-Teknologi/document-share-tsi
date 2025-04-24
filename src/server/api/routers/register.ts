import { z } from "zod";
import bcrypt from 'bcryptjs';

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const registerRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      roleId: z.string()
    }))
    .mutation(({ ctx, input }) => {


      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          roleId: input.roleId,
          hashedPassword: input.password,
        }
      })
    })
})