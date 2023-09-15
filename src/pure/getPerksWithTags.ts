import perkDescriptions from "__generated__/perkDescriptions.json";
import { env } from "env.mjs";
import { getAllPerks } from "pure/perkInfo/getAllPerks";

function getImageURL(
    perkName: string,
    imageCode: string,
    perkNameInImageFilename?: string
) {
    const perkNameInFile =
        perkNameInImageFilename ??
        perkName
            .replace(/\w/g, (match) => match.toLowerCase())
            .replace(/&/g, "and")
            .replace(/[^\w\s-]/g, "")
            .replace(/\W(\w)/g, (match) => match.toUpperCase())
            .replace(/^(.)/, (match) => match.toLowerCase())
            .replace(/\s/g, "");
    const fileName = `IconPerks_${perkNameInFile}.png`;
    return `https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/${imageCode}/${fileName}`;
}

function getPerkDescription(perkName: string) {
    // @ts-expect-error JSON access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const description = perkDescriptions[perkName] as string | undefined;
    if (description) {
        return description;
    } else {
        // eslint-disable-next-line no-console
        console.error(
            `Failed to fetch perk description for perk "${perkName}"`
        );
        return '<span class="text-red-900">Unable to fetch perk description.</span>';
    }
}

export function getPerksWithTags(tags: string[]) {
    if (tags.length < 1 && env.NODE_ENV !== "development") {
        return [];
    }

    const perks = getAllPerks();
    const filteredPerks = perks.filter((perk) => {
        return tags.every((tag) => perk.tags.includes(tag));
    });

    return filteredPerks.map((perk) => ({
        ...perk,
        icon: getImageURL(perk.name, perk.icon, perk.perkNameInImageFilename),
        description: getPerkDescription(perk.name),
    }));
}
