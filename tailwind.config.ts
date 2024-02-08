import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                perkDescription: "#aaa9a9",
            },
        },
    },
    safelist: ["list-disc", "mt-1.5", "mb-4", "ml-9"],
    plugins: [],
} satisfies Config;
