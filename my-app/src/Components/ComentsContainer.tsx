"use client";

import { useComment } from "@/context/CommentsContext";
import { useUserInfo } from "@/context/UserInfoContext";
import { ArrowUp, Heart, MessageCircle, Navigation, Repeat2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function CommentsContainer() {
    const { isOpenComments, setIsOpenComments, postUuid } = useComment();
    const CommentMenuRef = useRef<HTMLDivElement | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (isOpenComments) {
            setShowMenu(true);
        } else {
            const timeout = setTimeout(() => setShowMenu(false), 500); // match duration
            return () => clearTimeout(timeout);
        }
    }, [isOpenComments]);

    useEffect(() => {
        const HideCommentsMenu = (e: MouseEvent) => {
            if (CommentMenuRef.current && !CommentMenuRef.current.contains(e.target as Node)) {
                setIsOpenComments(false);
            }
        };
        document.addEventListener('mousedown', HideCommentsMenu);
        return () => removeEventListener('mousedown', HideCommentsMenu);
    }, []);

    const { email, name, profileimage } = useUserInfo();
    const [textComment, setTextComment] = useState('');
    const HandleCreateComment = () => {
        // const DocRef = 
    }
    return (
        <main
            className={`
                fixed left-0 top-0 h-screen z-50
                transition-all duration-500 ease-in-out
                flex flex-col justify-end items-center py-10
                ${isOpenComments ? "bg-black/50 w-full opacity-100" : "bg-transparent w-0 opacity-0"}
                ${showMenu ? "pointer-events-auto" : "pointer-events-none"}
            `}
        >
            <section
                ref={CommentMenuRef}
                className={`
                    bg-neutral-900 rounded-3xl border border-neutral-800
                    overflow-hidden transition-all duration-500 ease-in-out
                    transform h-full
                    ${isOpenComments
                        ? "max-w-3xl max-h-[1000px] scale-100 opacity-100 p-4"
                        : "max-w-0 max-h-0 scale-95 opacity-0 p-0"
                    }
                `}
            >
                <div className="flex items-start gap-4 p-4 border-b border-neutral-800">
                    <div className="w-10 h-10 rounded-full border flex-shrink-0">
                        {/* Image */}
                    </div>
                    <div>
                        <span className="flex items-center gap-2">
                            <h1>Mostafa Jaafari</h1>
                            <p className="text-neutral-500 text-sm">13h</p>
                        </span>
                        <p>
                            {postUuid}
                        </p>
                        <div className="w-full flex items-center gap-6 pt-4">
                            <span className="flex gap-1 cursor-pointer hover:scale-105 transition-all duration-200">
                                <Heart size={20} />
                            </span>
                            <MessageCircle size={20} />
                            <Repeat2 size={20} />
                            <Navigation size={20} />
                        </div>
                    </div>
                </div>
            <div
                className="fixed bottom-0 left-0 w-full px-4
                    min-h-16 border-t border-neutral-800 flex items-center gap-2"
            >
                <div
                    className="relative overflow-hidden 
                        border w-10 h-10 rounded-full"
                >
                    <Image 
                        src={profileimage as string || ""}
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>
                <textarea 
                    name="" 
                    id=""
                    className="grow"
                    placeholder="write comment here..."
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    >
                </textarea>
                <button
                    onClick={HandleCreateComment}
                    className="w-10 h-10 rounded-lg border
                        flex items-center justify-center cursor-pointer"
                >
                    <ArrowUp size={20}/>
                </button>
            </div>
            </section>
        </main>
    );
}
