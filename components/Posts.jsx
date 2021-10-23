import Post from "./Post";
import {useEffect, useState} from "react";
import {db} from "../firebase";
import {collection, onSnapshot, query, orderBy} from "@firebase/firestore"

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), snapshot => {
            setPosts(snapshot.docs);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div>
            {posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
    );
};

export default Posts;