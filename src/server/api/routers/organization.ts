import {
  createTRPCRouter,
  publicProcedure
} from "@/server/api/trpc";

export const organizationRouter = createTRPCRouter({
    createOrganization: publicProcedure.mutation(({ ctx }) => {
      return ctx.db.organization.create({});
    })
});