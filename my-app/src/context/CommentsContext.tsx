"use client";
import { createContext, useContext, useState } from "react";


interface CommentsContainerProps {
    setIsOpenComments: (iSOpen: boolean) => void;
    isOpenComments: boolean;
    setPostUuid: (postuuid: string) => void;
    postUuid: string;
}
const CommentContext = createContext<CommentsContainerProps | null>(null);
export function CommentContextProvider({ children } : {children: React.ReactNode;}){
    const [isOpenComments, setIsOpenComments] = useState<boolean>(false);
    const [postUuid, setPostUuid] = useState('');
    return (
        <CommentContext.Provider value={{ isOpenComments, setIsOpenComments, setPostUuid, postUuid }}>
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