"use client";
import { Post } from "@/Components/PostsContainer";
import { db } from "@/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";


export interface PostComments extends Post {
    comments: {
        uuid: string;
        text: string,
        createdAt: string,
        author: {
            Name: string;
            Email: string;
            ProfileImage: string;
        }

    }[]
}
interface CommentsContainerProps {
    setIsOpenComments: (iSOpen: boolean) => void;
    isOpenComments: boolean;
    setPostUuid: (postuuid: string) => void;
    postUuid: string;
    postOwner: string;
    setPostOwner: (owner: string) => void;
    commentsLength: number;
    PostSelected: PostComments | undefined;
    isLoadingComments: boolean;
}
const CommentContext = createContext<CommentsContainerProps | null>(null);
export function CommentContextProvider({ children } : {children: React.ReactNode;}){
    const [isOpenComments, setIsOpenComments] = useState<boolean>(false);
    const [postUuid, setPostUuid] = useState('');
    const [postOwner, setPostOwner] = useState('');
    const [commentsLength, setCommentsLength] = useState(0)
    const [allPosts, setAllPosts] = useState<PostComments[] | []>([]);
    const PostSelected = allPosts.find((post: Post) => post?.uuid === postUuid);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'global', "posts"), (snapshot) => {
            const posts = snapshot?.data()?.posts || [];
            setAllPosts(posts);
            setIsLoadingComments(false);
        })
        return () => unsubscribe();
    },[])
    useEffect(() => {
        const selected = allPosts.find((post) => post?.uuid === postUuid);
        if (selected) {
            setCommentsLength(selected.comments?.length || 0);
        }
    }, [allPosts, postUuid]);
    return (
        <CommentContext.Provider value={{ isOpenComments, setIsOpenComments, postOwner, setPostOwner, setPostUuid, postUuid, PostSelected, commentsLength, isLoadingComments }}>
            {children}
        </CommentContext.Provider>
    )
}

export function useComment(){
    const Context = useContext(CommentContext);
    if(!Context){
        throw new Error("useComment must be used within an CommentContextProvider");
    }
    return Context;
}