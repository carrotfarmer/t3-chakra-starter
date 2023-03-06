import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx }) => {
    return "hello";
  }),
});
