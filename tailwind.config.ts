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
    plugins: [],
} satisfies Config;
