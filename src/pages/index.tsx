import { TagsAndPerks } from "components/TagsAndPerks";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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
                    <TagsAndPerks />
                </main>
            </div>
        </>
    );
};

export default Home;
