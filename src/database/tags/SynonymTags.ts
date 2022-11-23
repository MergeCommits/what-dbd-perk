const peopleTags = ["person", "people"];

export const synonymTags = [
    peopleTags,
    ["foot", "feet", "boot", "shoe"],
    ["syringe", "injection", "needle"],
    ["pointing", "finger"],
    ["plant", "flower", "nature"],
    ["crouch", "kneel"],
    ["clock", "watch", "time"],
    ["runnning", "sprint"],
    ["jump", "leap", "vault"],
    ["window", "pallet"],
    ["hiding", "hide"],
    ["grenade", "flash bang"],
    ["deer", "horns", "animal"],
    ["crow", "bird", "animal"],
    ["wolf", "hound", "dog", "animal"],
    ["teeth", "tooth"],
    ["fire", "flame"],
    ["gate", "exit gate"],
    ["blood", "bleeding"],
    ["bandage", "bandaid"],
    ["head", "face"],
    ["grab", "grasp"],
    ["knight", ...peopleTags],
];

export const getSynonyms = (tags: string[]) => {
    const synonyms = [];
    for (const tag of tags) {
        for (const synonymTag of synonymTags) {
            if (synonymTag.includes(tag)) {
                synonyms.push(...synonymTag);
            }
        }
    }
    return synonyms;
};
