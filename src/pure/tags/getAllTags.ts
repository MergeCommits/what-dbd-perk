import { getAllPerks } from "pure/perkInfo/getAllPerks";

export function getAllTags() {
    return allTags;
}

const allTags = [
    ...new Set(
        getAllPerks()
            .map((perk) => perk.tags)
            .flat()
    ),
];
