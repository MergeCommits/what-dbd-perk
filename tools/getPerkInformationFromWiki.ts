import axios from "axios";
import { writeFile } from "fs";
import type { HTMLElement } from "node-html-parser";
import { parse } from "node-html-parser";
import { killerPerks } from "../src/pure/perkInfo/killerPerks";
import { survivorPerks } from "../src/pure/perkInfo/survivorPerks";

const websitePath = "https://deadbydaylight.fandom.com/wiki/";

async function getPerkDescriptionFromWiki(name: string) {
    const perkURL = `${websitePath}${name.replaceAll(" ", "_")}`;
    const body = (await axios.get<string>(perkURL)).data;
    const perkDescription = parse(body).querySelector(".formattedPerkDesc");

    if (perkDescription === null) {
        throw Error(
            `Could not locate description for "${name}" at url "${perkURL}"`
        );
    }

    sanitizePerkDescription(perkDescription);

    return perkDescription.innerHTML;
}

function sanitizePerkDescription(description: HTMLElement) {
    description.querySelectorAll("img").forEach((e) => e.remove());
    description.querySelectorAll("a").forEach((e) => e.replaceWith(e.text));

    description
        .querySelectorAll("span:not([class])")
        // The wiki sometimes forgets to add spaces between words when there is an image between them, so add them in when needed.
        .forEach((span) => {
            // The typing for previousSibling and nextSibling is wrong and doesn't show that they're nullable.
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

    description
        .querySelectorAll("ul")
        .forEach((e) => e.setAttribute("class", "list-disc ml-4"));
}

async function writeAllPerkDescriptionsToFile() {
    const perks = [...survivorPerks, ...killerPerks];
    const perksWithDescription: Record<string, string> = {};

    const promises = perks.map((perk) => {
        return getPerkDescriptionFromWiki(perk.name)
            .then((description) => {
                perksWithDescription[perk.name] = description;
            })
            .catch((err) => {
                throw err;
            });
    });

    await Promise.all(promises);

    // write to json file
    writeFile(
        "./src/__generated__/perkDescriptions.json",
        JSON.stringify(perksWithDescription, null, 4),
        (err) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            } else {
                // eslint-disable-next-line no-console
                console.log("Perk descriptions successfully written to file.");
            }
        }
    );
}

void writeAllPerkDescriptionsToFile();
