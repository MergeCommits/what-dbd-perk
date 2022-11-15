import { fetchPerksFromTags } from "database/perks/fetchData";
import { publicProcedure, router } from "server/trpc/trpc";
import { z } from "zod";

export const perksRouter = router({
    getPerksFromTags: publicProcedure
        .input(z.object({ tags: z.array(z.string()) }))
        .query(async ({ input }) => {
            return {
                perks: await fetchPerksFromTags(input.tags),
            };
        }),
});
