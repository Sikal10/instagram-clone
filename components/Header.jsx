import {HeartIcon, UserGroupIcon, MenuIcon, PaperAirplaneIcon, SearchIcon, PlusCircleIcon} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {signIn, signOut} from "next-auth/react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {modalState} from "../atoms/modalAtom";


const Header = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);

    return (
        <header className={"bg-white shadow-sm sticky top-0 z-10"}>
            <nav className={"flex items-center justify-between max-w-6xl px-5 md:px-0 mx-auto"}>
                {/*left--logo*/}
                <figure onClick={() => router.push("/")} className={"lg:hidden h-10 w-10 flex-shrink-0 relative"}>
                    <Image src={"/images/insta-logo.png"} objectFit={"contain"} layout={"fill"} />
                </figure>

                <figure onClick={() => router.push("/")} className={"hidden lg:inline-grid h-24 w-24 relative"}>
                    <Image src={"/images/logo.png"} layout={"fill"} objectFit={"contain"} />
                </figure>

                {/*middle-searchbar*/}
                <section className={"max-w-xs"}>
                    <div className={"relative p-3 mt-1"}>
                        <div className={"flex items-center pl-3 inset-y-0 absolute"}>
                            <SearchIcon className={"h-5 w-5 text-gray-500"} />
                        </div>
                        <input type="text" placeholder={"Search"} className={"bg-gray-50 outline-none focus:ring-black focus:border-black block w-full pl-10 sm:text-sm " +
                        "border border-gray-300  rounded-md"} />
                    </div>
                </section>

                {/*right--icons*/}

                <div className={"flex items-center space-x-4"}>
                    <HomeIcon onClick={() => router.push("/")} className={"nav-btn"} />
                    <MenuIcon className={"h-6 cursor-pointer md:hidden"} />

                    {session ? <>
                        <div className={"relative nav-btn"}>
                            <PaperAirplaneIcon className={"rotate-45"} />
                            <span className={"animate-pulse absolute -top-1 text-white -right-2 w-5 h-5 flex justify-center text-xs border bg-red-500 rounded-full"}>
                            3
                        </span>
                        </div>
                        <PlusCircleIcon onClick={() => setOpen(true)} className={"nav-btn"} />
                        <UserGroupIcon className={"nav-btn"} />
                        <HeartIcon className={"nav-btn"} />
                        <figure className={" "}>
                            <img onClick={signOut} className={"w-10 h-10 rounded-full"} src={session.user.image} />
                        </figure>
                    </> : <button onClick={signIn}>Sign in</button>}

                </div>
            </nav>
        </header>
    );
};

export default Header;