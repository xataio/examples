import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { getXataClient } from "../../utils/xata";
import { TRPCError } from "@trpc/server";

export const todoRouter = router({
  /**
   * List user todo items.
   */
  list: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.user.id;
    const xata = getXataClient();

    return xata.db.items.filter({ userId }).getAll();
  }),

  /**
   * Add a new todo item
   */
  add: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      const xata = getXataClient();
      const createdItem = await xata.db.items.create({
        userId,
        isCompleted: false,
        title: input.title,
      });

      return createdItem;
    }),

  /**
   * Edit an exiting todo item
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        isCompleted: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      const xata = getXataClient();

      // Ensure the item is own by our user
      const existingRecord = await xata.db.items
        .filter({ userId, id: input.id })
        .getFirst();

      if (!existingRecord)
        throw new TRPCError({
          code: "FORBIDDEN",
        });

      return xata.db.items.update(input);
    }),

  /**
   * Delete a todo item
   */
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      const xata = getXataClient();

      // Ensure the item is own by our user
      const existingRecord = await xata.db.items
        .filter({ userId, id: input.id })
        .getFirst();
      if (!existingRecord)
        throw new TRPCError({
          code: "FORBIDDEN",
        });

      return xata.db.items.delete(input);
    }),
});
