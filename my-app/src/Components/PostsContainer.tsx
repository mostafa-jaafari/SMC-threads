"use client";
import { useCreatePost } from "@/context/CreatePostContext";
import Image from "next/image";
import PostCard from "./PostCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/Firebase";
import { useUserInfo } from "@/context/UserInfoContext";


interface PostsContainerProps {
    session: {
        user: {
            image?: string;
            name?: string;
        };
    };
}
interface Post {
    postowner: string;
    whatsnew: string;
    createdAt: Timestamp;
    imagepost: string;
    email: string;
}

export default function PostsContainer({ session } : PostsContainerProps) {
    const { setIsCreatePostOpen } = useCreatePost();
    const params = useParams();
    const { email, name, profileimage } = useUserInfo()
    const Page_Id = params.pageid;
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    useEffect(() => {
        if (Page_Id !== "following") {
            const DocRef = doc(db, 'global', "posts");
            const unsubscribe = onSnapshot(DocRef, (snapshot) => {
                const data = snapshot.data();
                const posts = data?.posts;
                setAllPosts(posts)
            });
            return () => unsubscribe();
        }
    }, [Page_Id]);
    return (
        <main className="w-full">
            <div 
                className="hidden md:flex lg:flex w-full border-b border-neutral-800
                    px-6 py-4 items-center justify-between">
                <div className="flex items-center gap-3">
                <div 
                    className="relative w-10 h-10 rounded-full 
                        border-2 overflow-hidden">
                        {profileimage ? (
                        <Image
                            src={profileimage}
                            alt="User Profile"
                            fill
                            className="object-cover"
                        />
                        ) : (
                        <span 
                            className="text-2xl w-full h-full flex 
                            flex-col justify-center 
                            items-center bg-neutral-800">
                            {name && name.charAt(0).toUpperCase() || ""}
                        </span>
                        )}
                </div>
                <p 
                    onClick={() => setIsCreatePostOpen(true)}
                    className="text-neutral-600 hover:text-neutral-500">
                    What&apos;s new ?
                </p>
                </div>
                <button 
                    onClick={() => setIsCreatePostOpen(true)}
                    className="py-1 px-4 rounded-lg border 
                        hover:bg-neutral-800/50 cursor-pointer 
                        border-neutral-700">
                    Post
                </button>
            </div>
            <section>
                {allPosts?.map((post, index) => {
                    return (
                        <PostCard
                            key={index}
                            PostOwner={post?.postowner}
                            createdAt={post?.createdAt}
                            whatsnew={post?.whatsnew}
                            imagepost={post?.imagepost}
                        />
                    )
                })}
            </section>
        </main>
    )
}