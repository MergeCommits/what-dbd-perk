import { TagsAndPerks } from "components/TagsAndPerks";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>{"Which Dead by Daylight perk is this"}</title>
                <meta
                    name={"description"}
                    content={
                        "Figure out the dead by daylight perk by its icon description."
                    }
                />
                <link rel={"icon"} href={"/public/favicon.ico"} />
            </Head>
            <div className={"min-h-screen bg-stone-900"}>
                <main
                    className={
                        "container mx-auto flex flex-col items-center justify-center p-4 text-slate-400"
                    }
                >
                    <h1 className={"text-3xl font-extrabold leading-normal "}>
                        {"Which Dead by Daylight perk is this?"}
                    </h1>
                    <p className={"pt-4 text-xl"}>
                        {
                            "Enter a tag associated with the icon (face, person, skull, ect.) to find perks with that feature. Useful for when you're watching a streamer/video."
                        }
                    </p>
                    <p className={"text-md pb-4 pt-1"}>
                        {
                            "Want to check out the source or report issues? See the "
                        }
                        <a
                            className={"text-blue-500 hover:text-blue-700"}
                            href={
                                "https://github.com/MergeCommits/what-dbd-perk"
                            }
                            target={"_blank"}
                            rel={"noreferrer"}
                        >
                            {"GitHub repo"}
                        </a>
                        {"."}
                    </p>
                    <TagsAndPerks />
                </main>
            </div>
        </>
    );
}
