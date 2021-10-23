import Header from "./Header";
import Feed from "./Feed";
import Modal from "./Modal";

const Home = () => {
    return (
        <main className={"bg-gray-50 h-screen overflow-y-scroll scrollbar-hide"}>
            <Header />
            <Feed />
            <Modal />
        </main>
    );
};

export default Home;