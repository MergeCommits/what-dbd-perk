import { getAllPerks } from "database/perks/getAllPerks";

export const allTags = [
    ...new Set(
        getAllPerks()
            .map((perk) => perk.tags)
            .flat()
    ),
];
