import { killerPerks } from "database/perks/KillerPerks";
import { survivorPerks } from "database/perks/SurvivorPerks";

export const allTags = [
    ...new Set(
        [...killerPerks, ...survivorPerks]
            .map((perk) => perk.tags.split(","))
            .flat()
    ),
];
