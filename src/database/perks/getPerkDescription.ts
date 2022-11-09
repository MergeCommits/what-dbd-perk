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

    return test.querySelector(".formattedPerkDesc")?.innerHTML ?? "";
}
