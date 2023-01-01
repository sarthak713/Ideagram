import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { Post } from './post';
import '../../styles/main.css';
import { motion } from "framer-motion";


export interface Post {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
};

export const Main = () => {

    const [postsList, setPostsList] = useState<Post[] | null>(null);

    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(
            data.docs.map((doc) => (
                { ...doc.data(), id: doc.id }
            )) as Post[]
        );
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <motion.div id='mainPostsContainer'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
                duration:0.2
            }}
        >
            {postsList?.map(post => <Post post={post} key={post.id} />)}
        </motion.div>
    );
}