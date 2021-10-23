import faker from "faker";
import {useEffect, useState} from "react";
import Story from "./Story";
import {useSession} from "next-auth/react";

const Stories = () => {
    const [suggestions, setSuggestions] = useState([]);

    const {data: session} = useSession();


    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id:i
        }));

        setSuggestions(suggestions);
    }, [])

    return (
        <div className={"flex space-x-2 p-6 mt-8 bg-white overflow-x-scroll rounded-sm scrollbar-thin scrollbar-thumb-black"}>
            {session && <Story img={session.user.image} username={session.user?.username} />}
            {suggestions.map((profile) => <Story key={profile.id} username={profile.username} img={profile.avatar} />)}
        </div>
    );
};

export default Stories;