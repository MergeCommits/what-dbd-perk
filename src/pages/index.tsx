import { Combobox } from "@headlessui/react";
import Chip from "components/Chip";
import { killerPerks } from "database/perks/KillerPerks";
import { survivorPerks } from "database/perks/SurvivorPerks";
import { allTags } from "database/tags/builder";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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

    const [selectedPerson, setSelectedPerson] = useState("");
    const [query, setQuery] = useState("");

    const filteredTags =
        query === ""
            ? allTags
            : allTags.filter((tag) => {
                  return tag.toLowerCase().includes(query.toLowerCase());
              });

    const perks = [...survivorPerks, ...killerPerks].map((perk) => ({
        ...perk,
        tags: perk.tags.split(","),
    }));

    // check if perks contains any selected tags exclusively
    const filteredPerks = perks.filter((perk) => {
        return props.selectedTags.every((tag) => perk.tags.includes(tag));
    });

    const removeTag = async (tag: string) => {
        // reload page with new query
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
                    <Combobox
                        value={selectedPerson}
                        onChange={setSelectedPerson}
                    >
                        <Combobox.Input
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Options>
                            {filteredTags.map((person) => (
                                <Combobox.Option key={person} value={person}>
                                    {person}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Combobox>
                    <div className={"flex flex-wrap gap-2"}>
                        {props.selectedTags.map((tag) => (
                            <Chip
                                key={tag}
                                text={tag}
                                onClose={() => removeTag(tag)}
                            />
                        ))}
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        {filteredPerks.map((perk) => (
                            <div
                                key={perk.name}
                                className={
                                    "flex flex-col items-center justify-center rounded-lg bg-gray-700 p-4"
                                }
                            >
                                {perk.name}
                                <img src={perk.icon} />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
