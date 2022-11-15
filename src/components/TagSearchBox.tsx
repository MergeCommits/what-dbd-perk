"use client";

import { allTags } from "database/tags/builder";
import type { FC } from "react";
import { useId } from "react";
import Select from "react-select";

type Props = {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    isLoading: boolean;
};

export const TagSearchBox: FC<Props> = (props) => {
    const selectID = useId();

    const tags = allTags.map((tag) => ({
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
                props.setSelectedTags(tags?.map((tag) => tag.value) ?? []);
            }}
        />
    );
};
