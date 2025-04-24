import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { registerRouter } from "./routers/register";
import { roleRouter } from "./routers/role";
import { userRouter } from "./routers/user";
import { folderRouter } from "./routers/folder";
import { documentRouter } from "./routers/document";
import { projectRouter } from "./routers/project";
import { organizationRouter } from "./routers/organization";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  register: registerRouter,
  role: roleRouter,
  user: userRouter,
  folder: folderRouter,
  document: documentRouter,
  project: projectRouter,
  organization: organizationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
