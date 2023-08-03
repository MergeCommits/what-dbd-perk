import { getAllPerks } from "database/getAllPerks";

export const allTags = [
    ...new Set(
        getAllPerks()
            .map((perk) => perk.tags)
            .flat()
    ),
];
