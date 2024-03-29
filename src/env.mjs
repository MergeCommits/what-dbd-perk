import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {},

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        // NEXT_PUBLIC_CLIENT_VAR: z.string(),
    },

    shared: {
        NODE_ENV: z.enum(["development", "test", "production"]),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtime (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
    },

    emptyStringAsUndefined: true,
});
