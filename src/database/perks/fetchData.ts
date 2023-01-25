import { getAllPerks } from "database/perks/getAllPerks";
import type { HTMLElement } from "node-html-parser";
import { parse } from "node-html-parser";

export async function fetchPerkDescription(name: string) {
    const wikiPage = await fetch(
        `https://deadbydaylight.fandom.com/wiki/${name.replaceAll(" ", "_")}`
    );

    if (wikiPage.status === 404) {
        return '<span class="text-red-900">Unable to fetch perk description.</span>';
    }

    const body = await wikiPage.text();
    const perkDescription = parse(body).querySelector(".formattedPerkDesc");

    if (perkDescription === null) {
        return '<span class="text-red-900">Unable to fetch perk description.</span>';
    }

    perkDescription.querySelectorAll("img").forEach((e) => e.remove());
    perkDescription.querySelectorAll("a").forEach((e) => e.replaceWith(e.text));

    // The wiki sometimes forgets to add spaces between words when there is an image between them, so add them in when needed.
    const smartRemoveSpan = (span: HTMLElement) => {
        const textBefore = span.previousSibling.text;
        const textAfter = span.nextSibling.text;
        const needsSpace =
            textBefore.length > 0 &&
            textAfter.length > 0 &&
            !textBefore.endsWith(" ") &&
            !textAfter.startsWith(" ") &&
            !textAfter.startsWith(",");

        span.replaceWith(`${needsSpace ? " " : ""}${span.text}`);
    };
    perkDescription
        .querySelectorAll("span:not([class])")
        .forEach(smartRemoveSpan);
    perkDescription
        .querySelectorAll("span[class]")
        .forEach((e) => e.removeAttribute("class"));

    perkDescription
        .querySelectorAll("ul")
        .forEach((e) => e.setAttribute("class", "list-disc ml-4"));

    return perkDescription.innerHTML;
}

export async function fetchPerksFromTags(tags: string[]) {
    if (tags.length < 1) {
        return [];
    }

    const perks = getAllPerks();
    const filteredPerks = perks.filter((perk) => {
        return tags.every((tag) => perk.tags.includes(tag));
    });

    const promises = filteredPerks.map(async (perk) => ({
        ...perk,
        description: await fetchPerkDescription(perk.name),
    }));

    return await Promise.all(promises);
}
