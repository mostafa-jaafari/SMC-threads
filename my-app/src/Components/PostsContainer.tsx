"use client";
import { useCreatePost } from "@/context/CreatePostContext";
import Image from "next/image";
import PostCard from "./PostCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/Firebase";
import { useUserInfo } from "@/context/UserInfoContext";
import PostSkeleton from "./PostSkeleton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";



export interface Post {
    postowner: string;
    whatsnew: string;
    createdAt: Timestamp;
    imagepost: string;
    email: string;
    uuid: string;
}

export default function PostsContainer() {
    const { setIsCreatePostOpen } = useCreatePost();
    const params = useParams();
    const { name, profileimage, Following } = useUserInfo()
    const Page_Id = params.pageid;
    const [Posts, setPosts] = useState<Post[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    useEffect(() => {
        setIsLoadingPosts(true)
        try{
            if (Page_Id !== "following") {
            const DocRef = doc(db, 'global', "posts");
            const unsubscribe = onSnapshot(DocRef, (snapshot) => {
                const data = snapshot.data();
                const posts = data?.posts;
                setPosts(posts)
                setIsLoadingPosts(false);
            });
            return () => unsubscribe();
        }else if(Page_Id === "following"){
            const DocRef = doc(db, 'global', "posts");
            const unsubscribe = onSnapshot(DocRef, (snapshot) => {
                const data = snapshot.data();
                const posts = data?.posts;
                const Following_Posts = posts.filter((post: Post) => Following.includes(post.postowner));
                setPosts(Following_Posts)
                setIsLoadingPosts(false);
            });
            return () => unsubscribe();
        }
    }catch(err){
        console.log(err);
        setIsLoadingPosts(false);
    }
    }, [Page_Id, Following]);
    
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
                {isLoadingPosts ? (
                        <PostSkeleton />
                    )
                    :
                    Page_Id === "following" && Posts.length === 0 ?
                    (
                        <div
                            className="p-6 w-full flex flex-col items-center gap-6 justify-center text-neutral-500"
                        >
                            <p
                                className="text-neutral-500"
                            >
                                Please Follow people to see more content here...
                            </p>
                            <Link
                                href="/"
                                className="flex items-center gap-1 py-2 px-4 text-sm rounded-xl bg-white 
                                    hover:bg-neutral-300 text-black font-bold"
                            >
                                <ChevronLeft size={20}/> Back Home
                            </Link>
                        </div>
                    )
                    :
                    Posts?.map((post, index) => {
                    return (
                        <PostCard
                            key={index}
                            PostOwner={post?.postowner}
                            createdAt={post?.createdAt}
                            whatsnew={post?.whatsnew}
                            imagepost={post?.imagepost}
                            Postuuid={post?.uuid}
                            CurrentPostIndex={index}
                            PostsLength={Posts.length}
                        />
                    )
                })}
            </section>
        </main>
    )
}