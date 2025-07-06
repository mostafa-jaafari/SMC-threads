"use client";
import { useCreatePost } from "@/context/CreatePostContext";
import Image from "next/image";


interface PostsContainerProps {
    session: {
        user: {
            image?: string;
            name?: string;
        };
    };
}
export default function PostsContainer({ session } : PostsContainerProps) {
    const { setIsCreatePostOpen } = useCreatePost();
    return (
        <main className="w-full h-full">
            <div 
                className="hidden md:flex lg:flex w-full border-b border-neutral-800
                px-6 py-4 items-center justify-between">
                <div className="flex items-center gap-3">
                <div 
                    className="relative  w-10 h-10 rounded-full 
                    border-2 overflow-hidden">
                        {session?.user?.image ? (
                        <Image
                            src=""
                            alt="User Profile"
                            fill
                            className="object-cover"
                        />
                        ) : (
                        <span 
                            className="text-2xl w-full h-full flex 
                            flex-col justify-center 
                            items-center bg-neutral-800">
                            {session?.user?.name && session?.user?.name.charAt(0).toUpperCase() || ""}
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
            test test
        </main>
    )
}