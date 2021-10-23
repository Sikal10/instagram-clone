
const Story = ({img, username}) => {
    return (
        <div className={""}>
            <img className={"h-14 w-14 rounded-full border-2 p-[1.5px] hover:scale-110 transform transition duration-200 ease-out object-contain cursor-pointer border-red-500"} src={img} alt=""/>
            <p className={"text-xs w-14 text-center truncate"}>{username}</p>
        </div>
    );
};

export default Story;