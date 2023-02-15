import { PerkResults } from "components/PerkResults";
import { TagSearchBox } from "components/TagSearchBox";
import type { FC } from "react";
import { useState } from "react";
import { api } from "utils/api";

export const TagsAndPerks: FC = () => {
    const [selectedTags, setSelectedTag] = useState<string[]>([]);

    const result = api.perks.getPerksFromTags.useQuery({ tags: selectedTags });

    return (
        <div className={"flex w-full flex-col gap-8"}>
            <TagSearchBox
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTag}
                isLoading={result.isLoading}
            />
            {result.data !== undefined && (
                <PerkResults
                    perks={result.data.perks}
                    selectedTags={selectedTags}
                />
            )}
        </div>
    );
};
