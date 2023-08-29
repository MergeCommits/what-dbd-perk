import { killerPerks } from "pure/perkInfo/killerPerks";
import { survivorPerks } from "pure/perkInfo/survivorPerks";
import { synonymTags } from "pure/tags/synonymTags";

export type DBDPerk = Omit<(typeof survivorPerks)[0], "tags"> & {
    tags: string[];
    description: string;
};

export function getAllPerks() {
    return [...getSurvivorPerks(), ...getKillerPerks()];
}

function getKillerPerks() {
    return killerPerks
        .map(convertTagsStringToArrayAndAddSynonyms)
        .map((perk) => {
            const tags = [...perk.tags, "killer"];

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
    return survivorPerks
        .map(convertTagsStringToArrayAndAddSynonyms)
        .map((perk) => {
            const tags = [...perk.tags, "survivor"];

            if (perk.name.startsWith("Boon:")) {
                tags.push("boon");
            }

            return {
                ...perk,
                tags,
            };
        });
}

function convertTagsStringToArrayAndAddSynonyms(
    perk: (typeof survivorPerks)[0]
) {
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
