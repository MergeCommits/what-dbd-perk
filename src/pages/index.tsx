import Chip from "components/Chip";
import { TagSearchBox } from "components/TagSearchBox";
import { fetchPerks } from "database/perks/fetchData";
import type { DBDPerk } from "database/perks/getAllPerks";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";

type Props = {
    selectedTags: string[];
    perks: DBDPerk[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    const tags =
        context.query.tags === undefined
            ? []
            : typeof context.query.tags === "string"
            ? context.query.tags.split(",")
            : context.query.tags;

    return {
        props: {
            selectedTags: tags,
            perks: await fetchPerks(tags),
        },
    };
};

const Home: NextPage<Props> = (props) => {
    const router = useRouter();

    const removeTag = async (tag: string) => {
        const newTags = props.selectedTags.filter((t) => t !== tag);
        await router.push({
            pathname: "/",
            query: newTags.length > 0 ? { tags: newTags } : null,
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
            <div className={"min-h-screen bg-stone-900"}>
                <main
                    className={
                        "container mx-auto flex flex-col items-center justify-center p-4"
                    }
                >
                    <h1
                        className={
                            "text-3xl font-extrabold leading-normal text-yellow-900"
                        }
                    >
                        {"Which Dead by Daylight perk is this?"}
                    </h1>
                    <p className={"text-2xl text-yellow-900"}>
                        {
                            "Enter a tag associated with the icon (face, person, skull, ect.) to find the perk."
                        }
                    </p>
                    <TagSearchBox />
                    <div className={"flex flex-wrap gap-2"}>
                        {props.selectedTags.map((tag) => (
                            <Chip
                                key={tag}
                                text={tag}
                                onClose={() => removeTag(tag)}
                            />
                        ))}
                    </div>
                    <PerkResults perks={props.perks} />
                </main>
            </div>
        </>
    );
};

type PerkResultsProps = {
    perks: DBDPerk[];
};

const PerkResults: FC<PerkResultsProps> = (props) => {
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
                    <div
                        dangerouslySetInnerHTML={{ __html: perk.description }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Home;
