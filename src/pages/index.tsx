import { Combobox } from "@headlessui/react";
import { allTags } from "database/tags/builder";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
    const [selectedPerson, setSelectedPerson] = useState("");
    const [query, setQuery] = useState("");

    const filteredPeople =
        query === ""
            ? allTags
            : allTags.filter((tag) => {
                  return tag.toLowerCase().includes(query.toLowerCase());
              });

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
                            {filteredPeople.map((person) => (
                                <Combobox.Option key={person} value={person}>
                                    {person}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Combobox>
                </main>
            </div>
        </>
    );
};

export default Home;
