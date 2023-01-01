import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./main";
import '../../styles/post.css';

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {

    const { post } = props;

    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[]>([]);

    const likesRef = collection(db, 'likes');

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => (
            { userId: doc.data().userId, likeId: doc.id }
        )));
    }

    useEffect(() => {
        getLikes();
    }, []);

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLikes((prev) => prev
                    ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                    : [{ userId: user.uid, likeId: newDoc.id }]
                );
            }
        }
        catch (err) { }
    };
    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        }
        catch (err) { }
    };
    
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    return (
        <div id="postContainer">
            <div id="postUser">
                <p>@{post.username.toLowerCase().split(" ").join("")}</p>
            </div>
            <div id="postTitle">
                <h1>{post.title}</h1>
            </div>
            <div id="postDescription">
                <p>{post.description}</p>
            </div>
            <div id="postActions">
                {hasUserLiked
                    ?<button onClick={removeLike} id="postLikeBtn">🧡</button>
                    :<button onClick={addLike} id="postLikeBtn">🤍</button>
                }
                <p id="postLikeCount">{likes.length}</p>
            </div>
        </div>
    );
}