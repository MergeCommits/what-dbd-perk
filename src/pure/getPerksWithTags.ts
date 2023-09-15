import perkDescriptions from "__generated__/perkDescriptions.json";
import perkImages from "__generated__/perkImageURLs.json";
import { env } from "env.mjs";
import { getAllPerks } from "pure/perkInfo/getAllPerks";

function getImageURL(perkName: string) {
    // @ts-expect-error JSON access
    const imageURL = perkImages[perkName] as string | undefined;
    if (imageURL) {
        return imageURL;
    } else {
        // eslint-disable-next-line no-console
        console.error(`Failed to fetch perk image URL for perk "${perkName}"`);
        return "";
    }
}

function getPerkDescription(perkName: string) {
    // @ts-expect-error JSON access
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
        icon: getImageURL(perk.name),
        description: getPerkDescription(perk.name),
    }));
}
