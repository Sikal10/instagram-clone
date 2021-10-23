import faker from "faker";
import {useEffect, useState} from "react";
import Suggestion from "./Suggestion";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i
        }));

        setSuggestions(suggestions);

    }, []);

    return (
        <section className={"mt-4 ml-10"}>
            <div className={"flex justify-between text-sm mb-5"}>
                <h3 className={"text-sm font-bold text-gray-400"}>Suggestions for you</h3>
                <button className={"font-semibold text-gray-600"}>See All</button>
            </div>

            {suggestions.map((profile, i) => <div key={i} className={"my-3"}>
                <Suggestion profile={profile} />
            </div>)}

        </section>
    );
};

export default Suggestions;