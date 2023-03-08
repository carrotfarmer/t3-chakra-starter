import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
  .input(
    z.object({ 
      name: z.string()
    }))
  .mutation(async ({ input, ctx }) => {
    return await ctx.prisma.post.create({
      data: {
        name: input.name,
        userId: ctx.session.user.id
      }
    });
  }),

  getPosts: protectedProcedure
  .query(async ({ ctx }) => {
    return await ctx.prisma.post.findMany({
      where: {
        userId: ctx.session.user.id
      }
    })
  })
});
