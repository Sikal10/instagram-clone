import {useSession, signOut} from "next-auth/react";

const MiniProfile = () => {
    const {data: session} = useSession();
    return (
        <section className={"flex items-center justify-between mt-14 ml-10"}>
            <img src={session?.user?.image} className={"rounded-full object-cover p-[2px] border w-16 h-16"} alt=""/>

            <div className={"mx-4 flex-1"}>
                <h2 className={"font-bold"}>{session?.user?.username}</h2>
                <h3 className={"text-sm text-gray-400"}>Welcome to Instagram</h3>
            </div>

            <button onClick={signOut}>Sign Out</button>
        </section>
    );
};

export default MiniProfile;