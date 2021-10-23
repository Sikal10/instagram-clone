import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";
import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {addDoc, collection, serverTimestamp, deleteDoc, onSnapshot, query, orderBy, setDoc, doc} from "@firebase/firestore";
import {db} from "../firebase";
import Moment from "react-moment";

const Post = ({post}) => {
    const {data: session} = useSession();
    const {username, profileImg, image, caption} = post.data();
    const id = post.id;

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), (snapshot) =>
            setComments(snapshot.docs)
        ), [doc, id]);

    useEffect(() => onSnapshot(query(collection(db, "posts", id, "likes")), snapshot =>
            setLikes(snapshot.docs)
    ), [doc, id]);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1)
    }, [likes])

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username:session.user.username
            })
        }
    }

    const addComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })

    }

    return (
        <section className={"bg-white rounded-sm shadow-sm my-7"}>
            <div className={"flex items-center p-5"}>
                <img className={"w-12 mr-3 h-12 object-cover rounded-full p-1 border"} src={profileImg} alt=""/>
                <p className={"flex-1 font-bold"}>{username}</p>
                <DotsHorizontalIcon className={"h-6"}/>
            </div>

            <img src={image} className={"w-full"} alt=""/>

            {session && <div className={"flex justify-between px-4 pt-4"}>
                <div className={"flex space-x-4"}>
                    {hasLiked ? <HeartIconFilled onClick={likePost} className={"btn text-red-500"} /> :  <HeartIcon onClick={likePost} className={"btn"}/>
                    }
                    <ChatIcon className={"btn"}/>
                    <PaperAirplaneIcon className={"btn"}/>
                </div>

                <BookmarkIcon className={"btn"}/>
            </div>}

            <p className={"p-5 truncate"}>
                {likes.length > 0 && <p className={"font-bold mb-1"}>{likes.length} {likes.length === 1 ? "like" : "likes"}</p>}
                <span className={"font-bold mr-1"}>{username} </span>
                {caption}
            </p>

            {comments.length > 0 && <article className={"ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin"}>
                {comments.map((comment) => <div className={"flex items-center space-x-2 mb-3 "} key={comment.id}>
                    <img className={"h-7 rounded-full"} src={comment.data().userImage}/>
                    <p className={"text-sm flex-1"}><span className={"font-bold"}>{comment.data().userName}</span>{" "} {comment.data().comment}</p>
                        <Moment fromNow className="pr-5 text-xs">
                            {comment.data().timestamp?.toDate()}
                        </Moment>
                </div>
                )}

            </article>}

            {session && <form onSubmit={addComment} className={"flex items-center p-4"}>
                <EmojiHappyIcon className={"btn"} />
                <input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder={"Add a comment..."} className={"border-none flex-1 focus:ring-0"}/>
                <button type={"submit"} disabled={!comment.trim()} className={"text-blue-400 font-semibold"}>Post</button>
            </form>}

        </section>
    );
};

export default Post;