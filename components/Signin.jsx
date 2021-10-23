import {signIn} from "next-auth/react";
import Header from "./Header";

const Signin = ({providers}) => {
    return (
        <>
            <Header />

                <div className={"h-screen flex flex-col justify-center items-center px-14 py-2 -mt-40"}>
                    <img src="/images/logo.png" className={"w-80"} alt=""/>
                    <p className={"italic text-xs"}>This is a clone of the instagram app, built with Nextjs and Tailwindcss</p>

                    <div className={"mt-40"}>
                        {Object.values(providers).map((provider) => (
                            <div key={provider.name}>
                                <button className={"bg-blue-500 p-3 text-white rounded-lg"} onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
        </>
    );
};

export default Signin;