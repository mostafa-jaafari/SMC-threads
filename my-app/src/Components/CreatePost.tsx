'use client';

import { useCreatePost } from "@/context/CreatePostContext";
import { AlignLeft, CalendarClock, ChevronRight, ImagePlay, Images, MapPin, Smile } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef } from "react";


export default function CreatePost() {

    const session = useSession();
    const First_Letter = session?.data?.user?.name?.charAt(0).toUpperCase() || "";
    const PostMenuRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (PostMenuRef.current && !PostMenuRef.current.contains(event.target as Node)) {
                setIsCreatePostOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[])
    const { isCreatePostOpen, setIsCreatePostOpen, HandleCreatePost } = useCreatePost();
    if(!isCreatePostOpen) return null;
    return (
        <main 
            className="fixed top-0 left-0 w-full 
                h-screen bg-black/30 flex justify-center items-center">
            <section 
                ref={PostMenuRef}
                className="w-[90%] max-h-[60vh] sm:w-2/3 md:w-2/3 lg:w-1/2 
                    bg-neutral-900 lg:h-max md:h-max sm:h-max
                    border border-neutral-700 rounded-xl z-50">
                <div 
                    className="py-2 px-6 flex items-center 
                        justify-between border-b border-neutral-700">
                    <button
                        className="text-neutral-500 cursor-pointer 
                            border border-neutral-700 rounded-lg 
                            py-1 px-2 hover:text-neutral-400 
                            transition-all duration-300"
                        onClick={() => setIsCreatePostOpen(false)}
                    >
                        Cancel
                    </button>
                    <h1 className="lg:text-xl md:text-xl text-neutral-300">
                        Create Post
                    </h1>
                    <span className="cursor-pointer text-neutral-300 hover:text-white">
                        <CalendarClock size={26} />
                    </span>
                </div>
                <div className="-space-y-4">
                    <div className="p-6 flex items-center gap-3">
                    <div 
                        className="relative w-12 h-12 rounded-full 
                            overflow-hidden border border-neutral-600">
                                {session?.data?.user?.image ? (
                                    <Image 
                                        src={session?.data?.user?.image}
                                        alt="User Profile"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span 
                                        className="h-full w-full text-xl font-semibold 
                                            bg-neutral-800 flex flex-col justify-center 
                                            items-center rounded-full overflow-hidden">
                                        {First_Letter}
                                    </span>
                                )}
                    </div>
                    <div className="-space-y-1">
                        <span className="flex items-end gap-1">
                            <h1 className="text-neutral-300">
                                {session?.data?.user?.name}
                            </h1>
                            <ChevronRight size={18} className="text-neutral-600" />
                            <button 
                                className="text-neutral-600 text-sm hover:text-neutral-500 
                                    transition-all duration-300 cursor-pointer">
                                Add a topic
                            </button>
                        </span>
                        <input 
                            type="text" 
                            name="" 
                            id=""
                            autoFocus
                            placeholder="What's new?"
                            className="focus:outline-none text-sm 
                                placeholder:font-normal font-semibold 
                                text-neutral-500 border-none w-full"
                        />
                    </div>
                    </div>
                    <div className="px-12 border-neutral-900">
                        <ul 
                            className="w-full flex items-center 
                                gap-5 border-l-2 border-neutral-800
                                px-9 py-1">
                            <Images size={20} className="text-neutral-600 hover:text-neutral-500 cursor-pointer"/>
                            <ImagePlay size={20} className="text-neutral-600 hover:text-neutral-500 cursor-pointer"/>
                            <Smile size={20} className="text-neutral-600 hover:text-neutral-500 cursor-pointer"/>
                            <AlignLeft size={20} className="text-neutral-600 hover:text-neutral-500 cursor-pointer"/>
                            <MapPin size={20} className="text-neutral-600 hover:text-neutral-500 cursor-pointer"/>
                        </ul>
                    </div>
                </div>
                    <div className="px-9 py-2 flex items-center gap-2">
                        <div 
                            className="relative w-6 h-6 
                                rounded-full overflow-hidden border border-neutral-600">
                                    {session?.data?.user?.image ? (
                                    <Image 
                                        src={session?.data?.user?.image}
                                        alt="User Profile"
                                        fill
                                        className="object-cover"
                                    />
                                    ) : (
                                        <span 
                                            className="h-full w-full
                                                flex flex-col justify-center 
                                                items-center bg-neutral-800 rounded-full 
                                                overflow-hidden text-white">
                                            {First_Letter}
                                        </span>
                                    )}
                        </div>
                        <input 
                            type="text" 
                            name="" 
                            id=""
                            placeholder="Add a comment..."
                            className="focus:outline-none text-sm 
                                placeholder:font-normal font-semibold 
                                text-neutral-500 border-none w-full bg-transparent"
                        />
                    </div>

                    {/* ---------- */}

                    <div className="px-10 py-2 flex items-center 
                        justify-between border-t border-neutral-800">
                        <button 
                            className="text-neutral-600 
                                hover:text-neutral-500 transition-all 
                                cursor-pointer duration-300">
                            Anyone can reply & quote
                        </button>
                        <button 
                            onClick={() => HandleCreatePost && HandleCreatePost("test test")}
                            className="border border-neutral-800 
                                py-1 px-4 rounded-lg hover:bg-neutral-800 
                                hover:border-neutral-700 cursor-pointer 
                                transition-all duration-300">
                            Post
                        </button>
                    </div>
            </section>
        </main>
    )
}