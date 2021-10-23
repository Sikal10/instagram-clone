import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import {useSession} from "next-auth/react";

const Feed = () => {
    const {data: session} = useSession();

    return (
        <main className={`grid md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            <section className={"col-span-2 overflow-x-hidden"}>
                <Stories />
                {/*posts*/}
                <Posts />
            </section>

            {session && <section className={"hidden xl:inline-grid"}>
                <div className={"fixed top-20"}>
                    <MiniProfile />
                    <Suggestions />
                </div>
            </section>}

        </main>
    );
};

export default Feed;