import type { DBDPerk } from "database/perks/getAllPerks";
import Image from "next/image";
import type { FC } from "react";

type Props = {
    perks: DBDPerk[];
};

export const PerkResults: FC<Props> = (props) => {
    return (
        <div
            className={
                "flex flex-col bg-black text-sm leading-7 text-perkDescription"
            }
        >
            {props.perks.map((perk) => (
                <div key={perk.name} className={"flex border p-4 pl-0"}>
                    <div
                        className={
                            "flex shrink-0 basis-48 flex-col items-center justify-center px-4"
                        }
                    >
                        <h1 className={"text-center font-bold text-slate-100"}>
                            {perk.name}
                        </h1>
                        <Image
                            src={perk.icon}
                            alt={`icon of the perk called ${perk.name}`}
                            width={128}
                            height={128}
                        />
                    </div>
                    <div className={"flex flex-col"}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: perk.description,
                            }}
                        />
                        <p className={"mt-auto pt-4 text-slate-400"}>
                            <strong>
                                <em>
                                    {"Tags: "}
                                    {perk.tags.join(", ")}
                                </em>
                            </strong>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
