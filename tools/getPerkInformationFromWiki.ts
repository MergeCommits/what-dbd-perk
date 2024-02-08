import axios from "axios";
import { writeFile } from "fs";
import type { HTMLElement } from "node-html-parser";
import { parse } from "node-html-parser";
import { killerPerks } from "../src/pure/perkInfo/killerPerks";
import { survivorPerks } from "../src/pure/perkInfo/survivorPerks";

const websitePath = "https://deadbydaylight.fandom.com/wiki";
const perkDescriptionClassName = "perkDesc";

async function getPerkDescriptionFromWiki(name: string) {
    const perkURL = `${websitePath}/${name.replaceAll(" ", "_")}`;
    const body = (await axios.get<string>(perkURL)).data;
    const perkDescription = parse(body).querySelector(
        `.${perkDescriptionClassName}`
    );

    if (perkDescription === null) {
        throw Error(
            `Could not locate element "${perkDescriptionClassName}" for "${name}" at url "${perkURL}"`
        );
    }

    sanitizePerkDescription(perkDescription);

    return perkDescription.innerHTML;
}

function sanitizePerkDescription(description: HTMLElement) {
    description.querySelectorAll("img").forEach((e) => e.remove());
    description.querySelectorAll("a").forEach((e) => e.replaceWith(e.text));
    description
        .querySelectorAll("ul")
        .forEach((e) => e.setAttribute("class", "list-disc mt-1.5 mb-4 ml-9"));

    description
        .querySelectorAll("span:not([class])")
        // The wiki sometimes forgets to add spaces between words when there is an image between them, so add them in when needed.
        .forEach((span) => {
            if (span.previousSibling === null || span.nextSibling === null) {
                return;
            }

            const textBefore = span.previousSibling.text;
            const textAfter = span.nextSibling.text;
            const needsSpace =
                textBefore.length > 0 &&
                textAfter.length > 0 &&
                !textBefore.endsWith(" ") &&
                !textAfter.startsWith(" ") &&
                !textAfter.startsWith(",");

            span.replaceWith(`${needsSpace ? " " : ""}${span.text}`);
        });

    description
        .querySelectorAll("span[class]")
        .forEach((e) => e.removeAttribute("class"));
}

async function writeAllPerkDescriptionsToFile() {
    const perks = [...survivorPerks, ...killerPerks];
    const perkDescriptions: Record<string, string> = {};

    const promises = perks.map(async (perk) => {
        const description = await getPerkDescriptionFromWiki(perk.name);
        perkDescriptions[perk.name] = description;
    });

    await Promise.all(promises);

    const sortedPerkDescriptions: Record<string, string> = {};

    Object.keys(perkDescriptions)
        .sort()
        .forEach((key) => {
            // @ts-expect-error key is a valid key
            sortedPerkDescriptions[key] = perkDescriptions[key];
        });

    writeFile(
        "./src/__generated__/perkDescriptions.json",
        JSON.stringify(sortedPerkDescriptions, null, 4),
        (err) => {
            if (err) {
                throw err;
            } else {
                // eslint-disable-next-line no-console
                console.log(
                    "\x1b[32mPerk descriptions successfully written to file.\x1b[0m"
                );
            }
        }
    );
}

void writeAllPerkDescriptionsToFile();
