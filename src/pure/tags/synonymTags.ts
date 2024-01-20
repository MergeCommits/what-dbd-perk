const peopleTags = ["person", "people"];

export const synonymTags = [
    peopleTags,
    ["foot", "feet", "boot", "shoe"],
    ["hand", "fist"],
    ["syringe", "injection", "needle"],
    ["pointing", "finger"],
    ["plant", "flower", "nature"],
    ["crouch", "kneel"],
    ["clock", "watch", "time"],
    ["running", "sprinting"],
    ["vaulting", "jumping", "leaping"],
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
    ["bandage", "band-aid"],
    ["head", "face"],
    ["grab", "grasp"],
    ["knight", ...peopleTags],
    ["wrench", "tool"],
    ["sword", "scythe", "knife"],
    ["box", "crate"],
    ["alien", "creature", "xenomorph"],
    ["battery", "item"],
    ["bat", "baseball bat", "weapon", "tool"],
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
