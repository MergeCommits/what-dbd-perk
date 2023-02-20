import { PerkResults } from "components/PerkResults";
import { TagSearchBox } from "components/TagSearchBox";
import { useState } from "react";
import type { ReactFunction } from "types/ReactFunction";
import { api } from "utils/api";

export const TagsAndPerks: ReactFunction = () => {
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
