import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "env.mjs";
import { appRouter } from "server/api/root";

// export API handler
export default createNextApiHandler({
    router: appRouter,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {
                  // eslint-disable-next-line no-console
                  console.error(
                      `❌ tRPC failed on ${path}: ${JSON.stringify(error)}`
                  );
              }
            : undefined,
});
