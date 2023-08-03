import { fetchPerksFromTags } from "database/fetchData";
import { createTRPCRouter, publicProcedure } from "server/api/trpc";
import { z } from "zod";

export const perksRouter = createTRPCRouter({
    getPerksFromTags: publicProcedure
        .input(z.object({ tags: z.array(z.string()) }))
        .query(async ({ input }) => {
            return {
                perks: await fetchPerksFromTags(input.tags),
            };
        }),
});
