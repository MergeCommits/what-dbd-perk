import { Combobox } from "@headlessui/react";
import Chip from "components/Chip";
import { getAllPerks } from "database/perks/getAllPerks";
import { allTags } from "database/tags/builder";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";

type Props = {
    selectedTags: string[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    return {
        props: {
            selectedTags:
                context.query.tags === undefined
                    ? []
                    : typeof context.query.tags === "string"
                    ? context.query.tags.split(",")
                    : context.query.tags,
        },
    };
};

const Home: NextPage<Props> = (props) => {
    const router = useRouter();

    const removeTag = async (tag: string) => {
        const newTags = props.selectedTags.filter((t) => t !== tag);
        await router.push({
            pathname: "/",
            query: {
                tags: newTags.join(","),
            },
        });
    };

    return (
        <>
            <Head>
                <title>{"Which Dead by Daylight perk is this"}</title>
                <meta
                    name={"description"}
                    content={
                        "figure out the dead by daylight perk by its icon description"
                    }
                />
                <link rel={"icon"} href={"/public/favicon.ico"} />
            </Head>
            <div className={"min-h-screen bg-slate-900"}>
                <main
                    className={
                        "container mx-auto flex flex-col items-center justify-center p-4"
                    }
                >
                    <h1
                        className={
                            "text-3xl font-extrabold leading-normal text-gray-700"
                        }
                    >
                        {"Which Dead by Daylight perk is this?"}
                    </h1>
                    <p className={"text-2xl text-gray-700"}>
                        {
                            "Enter a tag associated with the icon (face, person, skull, ect.) to find the perk."
                        }
                    </p>
                    <TagSearch selectedTags={props.selectedTags} />
                    <div className={"flex flex-wrap gap-2"}>
                        {props.selectedTags.map((tag) => (
                            <Chip
                                key={tag}
                                text={tag}
                                onClose={() => removeTag(tag)}
                            />
                        ))}
                    </div>
                    <PerkResults tags={props.selectedTags} />
                </main>
            </div>
        </>
    );
};

type TagSearchProps = {
    selectedTags: string[];
};

const TagSearch: FC<TagSearchProps> = (props) => {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [selectedTag] = useState("");

    const filteredTags =
        query === ""
            ? allTags
            : allTags.filter((tag) => {
                  return tag.toLowerCase().includes(query.toLowerCase());
              });

    const addTag = async (tag: string) => {
        const newTags = [...props.selectedTags, tag];
        await router.push({
            pathname: "/",
            query: {
                tags: newTags.join(","),
            },
        });
    };

    return (
        <Combobox value={selectedTag} onChange={addTag}>
            <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Options>
                {filteredTags.map((tag) => (
                    <Combobox.Option key={tag} value={tag}>
                        {tag}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
};

type PerkResultsProps = {
    tags: string[];
};

const PerkResults: FC<PerkResultsProps> = (props) => {
    if (props.tags.length === 0) {
        return null;
    }

    const perks = getAllPerks();
    const filteredPerks = perks.filter((perk) => {
        return props.tags.every((tag) => perk.tags.includes(tag));
    });

    return (
        <div className={"flex flex-col"}>
            {filteredPerks.map((perk) => (
                <div key={perk.name} className={"flex"}>
                    <div className={"flex flex-col"}>
                        <h1>{perk.name}</h1>
                        <Image
                            src={perk.icon}
                            alt={`icon of the perk called ${perk.name}`}
                            width={64}
                            height={64}
                        />
                    </div>
                    <p>{perk.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
