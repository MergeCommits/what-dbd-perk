import { getPerksWithTags } from "pure/getPerksWithTags";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import { z } from "zod";

export const perksRouter = createTRPCRouter({
    getPerksFromTags: publicProcedure
        .input(z.object({ tags: z.array(z.string()) }))
        .query(({ input }) => {
            return {
                perks: getPerksWithTags(input.tags),
            };
        }),
});
