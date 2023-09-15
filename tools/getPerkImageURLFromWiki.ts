import axios from "axios";
import { writeFile } from "fs";
import { killerPerks } from "../src/pure/perkInfo/killerPerks";
import { survivorPerks } from "../src/pure/perkInfo/survivorPerks";

const websitePath = "https://deadbydaylight.fandom.com/wiki";

type PerkNameOrImageFilename = {
    perkName: string;
    perkNameInImageFilename?: string;
};

function getPerkImageName(options: PerkNameOrImageFilename) {
    const perkNameInFile =
        options.perkNameInImageFilename ??
        options.perkName
            .replace(/\w/g, (match) => match.toLowerCase())
            .replace(/&/g, "and")
            .replace(/[^\w\s-]/g, "")
            .replace(/\W(\w)/g, (match) => match.toUpperCase())
            .replace(/^(.)/, (match) => match.toLowerCase())
            .replace(/\s/g, "");

    return `IconPerks_${perkNameInFile}.png`;
}

async function getPerkImageURLFromWiki(options: PerkNameOrImageFilename) {
    const imageName = getPerkImageName(options);
    const imageMetadataURL = `${websitePath}/File:${imageName}`;
    const body = (await axios.get<string>(imageMetadataURL)).data;

    const regex = new RegExp(
        `https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/[\\w]/[\\w]{2}/${imageName}`,
        "g"
    );

    const matches = body.match(regex);
    if (matches === null || matches.length < 1) {
        throw Error(
            `Could not locate image URL for "${options.perkName}" at url "${imageMetadataURL}"`
        );
    }

    return matches[0];
}

async function writeAllPerkImageURLsToFile() {
    const perks = [...survivorPerks, ...killerPerks];
    const perkImages: Record<string, string> = {};

    const promises = perks.map(async (perk) => {
        const imageURL = await getPerkImageURLFromWiki({
            perkName: perk.name,
            perkNameInImageFilename: perk.perkNameInImageFilename,
        });
        perkImages[perk.name] = imageURL;
    });

    await Promise.all(promises);

    // write to json file
    writeFile(
        "./src/__generated__/perkImageURLs.json",
        JSON.stringify(perkImages, null, 4),
        (err) => {
            if (err) {
                throw err;
            } else {
                // eslint-disable-next-line no-console
                console.log(
                    "\x1b[32mPerk image URLs successfully written to file.\x1b"
                );
            }
        }
    );
}

void writeAllPerkImageURLsToFile();
