import { env } from "env.mjs";
import { getPerkDescriptionFromWiki } from "pure/getPerkDescriptionFromWiki";
import { getAllPerks } from "pure/perkInfo/getAllPerks";

function getImageURL(
    perkName: string,
    imageCode: string,
    perkNameInImage?: string
) {
    const perkNameInFile =
        perkNameInImage ??
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

export async function getPerksWithTags(tags: string[]) {
    if (tags.length < 1 && env.NODE_ENV !== "development") {
        return [];
    }

    const perks = getAllPerks();
    const filteredPerks = perks.filter((perk) => {
        return tags.every((tag) => perk.tags.includes(tag));
    });

    const promises = filteredPerks.map(async (perk) => ({
        ...perk,
        icon: getImageURL(perk.name, perk.icon, perk.perkNameInImage),
        description: await getPerkDescriptionFromWiki(perk.name).catch((e) => {
            // eslint-disable-next-line no-console
            console.error(
                `Failed to fetch perk description for perk "${perk.name}"`
            );
            // eslint-disable-next-line no-console
            console.error(e);
            return '<span class="text-red-900">Unable to fetch perk description.</span>';
        }),
    }));

    return await Promise.all(promises);
}
