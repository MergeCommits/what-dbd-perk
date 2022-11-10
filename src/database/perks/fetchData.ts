import { getAllPerks } from "database/perks/getAllPerks";
import { parse } from "node-html-parser";

export async function fetchPerkDescription(name: string) {
    const result = await fetch(
        `https://deadbydaylight.fandom.com/wiki/${name.replaceAll(" ", "_")}`
    );

    const text = await result.text();
    const test = parse(text);
    test.querySelectorAll("img").forEach((e) => e.remove());
    test.querySelectorAll("a").forEach((e) => e.replaceWith(e.text));
    test.querySelectorAll("span:not([class])").forEach((e) =>
        e.replaceWith(e.text)
    );
    test.querySelectorAll("span[class]").forEach((e) =>
        e.removeAttribute("class")
    );

    test.querySelectorAll("ul").forEach((e) =>
        e.setAttribute("class", "list-disc ml-4")
    );

    return test.querySelector(".formattedPerkDesc")?.innerHTML ?? "";
}

export async function fetchPerks(tags: string[]) {
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
