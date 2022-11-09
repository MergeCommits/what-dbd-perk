import { killerPerks } from "database/perks/KillerPerks";
import { survivorPerks } from "database/perks/SurvivorPerks";
import { synonymTags } from "database/tags/SynonymTags";

export type DBDPerk = Omit<typeof survivorPerks[0], "tags"> & {
    tags: string[];
    description: string;
};

export function getAllPerks() {
    return [...getKillerPerks(), ...getSurvivorPerks()];
}

function getKillerPerks() {
    return killerPerks.map(convertTagsStringToArray).map((perk) => {
        const tags = [...perk.tags, "killer"];

        // If perk name starts with Hex: add hex tag
        if (perk.name.startsWith("Hex:")) {
            tags.push("hex");
        }

        if (perk.name.startsWith("Scourge Hook:")) {
            tags.push("scourge");
        }

        return {
            ...perk,
            tags,
        };
    });
}

function getSurvivorPerks() {
    return survivorPerks.map(convertTagsStringToArray).map((perk) => {
        const tags = [...perk.tags, "survivor"];

        // If perk name starts with Boon: add boon tag
        if (perk.name.startsWith("Boon:")) {
            tags.push("boon");
        }

        return {
            ...perk,
            tags,
        };
    });
}

function convertTagsStringToArray(perk: typeof survivorPerks[0]) {
    const tags = perk.tags
        .split(",")
        .map((tag) => {
            const synonyms = synonymTags.find((synonymList) =>
                synonymList.includes(tag)
            );

            return synonyms ?? tag;
        })
        .flat();

    return {
        ...perk,
        tags,
    };
}
