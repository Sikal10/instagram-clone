import React from 'react';

const Suggestion = ({profile}) => {
    const {avatar, company, username} = profile;
    return (
        <div className={"flex items-center justify-between space-x-4"}>
            {/*image*/}
            <img src={avatar} className={"w-10 h-10 rounded-full border p-[2px]"} alt=""/>
            {/*middle*/}

            <div className={"flex-1"}>
                <h2 className={"text-sm font-semibold"}>{username}</h2>
                <h5 className={"text-xs text-gray-400"}>Works at {company.name}</h5>
            </div>
            {/*button*/}

            <button className={"text-blue-400 text-xs font-bold"}>Follow</button>
        </div>
    );
};

export default Suggestion;