"use client";

import { getAllTags } from "pure/tags/getAllTags";
import { getSynonyms } from "pure/tags/synonymTags";
import { useId } from "react";
import Select from "react-select";

type Props = {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    isLoading: boolean;
};

export function TagSearchBox(props: Props) {
    const selectID = useId();

    const selectedSynonyms = getSynonyms(props.selectedTags);
    const availableTags = getAllTags().filter(
        (tag) =>
            !props.selectedTags.includes(tag) && !selectedSynonyms.includes(tag)
    );

    const tags = availableTags.map((tag) => ({
        value: tag,
        label: tag,
    }));

    return (
        <Select
            instanceId={selectID}
            className={"w-full"}
            classNamePrefix={"react-select"}
            options={tags}
            isMulti
            isLoading={props.isLoading}
            onChange={(tags) => {
                props.setSelectedTags(tags.map((tag) => tag.value));
            }}
        />
    );
}
