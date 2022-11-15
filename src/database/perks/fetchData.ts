import { getAllPerks } from "database/perks/getAllPerks";
import { parse } from "node-html-parser";

export async function fetchPerkDescription(name: string) {
    const wikiPage = await fetch(
        `https://deadbydaylight.fandom.com/wiki/${name.replaceAll(" ", "_")}`
    );

    const body = await wikiPage.text();
    const perkDescription = parse(body).querySelector(".formattedPerkDesc");

    if (perkDescription === null) {
        return "";
    }

    perkDescription.querySelectorAll("img").forEach((e) => e.remove());
    perkDescription.querySelectorAll("a").forEach((e) => e.replaceWith(e.text));
    perkDescription
        .querySelectorAll("span:not([class])")
        .forEach((e) => e.replaceWith(e.text));
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
