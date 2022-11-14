"use client";

import { allTags } from "database/tags/builder";
import type { FC } from "react";
import Select from "react-select";

export const TagSearchBox: FC = () => {
    const tags = allTags.map((tag) => ({
        value: tag,
        label: tag,
    }));

    return <Select options={tags} isMulti className={"w-full"} />;
};
