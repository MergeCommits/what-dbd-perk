import { perksRouter } from "server/trpc/router/perks";
import { router } from "server/trpc/trpc";

export const appRouter = router({
    perks: perksRouter,
});

export type AppRouter = typeof appRouter;
