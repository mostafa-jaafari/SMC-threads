"use client";

import { useComment } from "@/context/CommentsContext";
import { useUserInfo } from "@/context/UserInfoContext";
import { db } from "@/Firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { ArrowUp, EllipsisVertical, Heart, MessageCircle, Navigation, Plus, Repeat2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Post } from "./PostsContainer";
import { v4 as uuid4 } from 'uuid';
import { toast } from "sonner";
import { getRelativeTime } from "./Functions/CalculateDateDifference";
import { UserDetailsTypes } from "./PostCard";
import { FollowButton } from "./Functions/FollowButton";
import { useSession } from "next-auth/react";


export function CommentsContainer() {
    const Current_User = useSession();
    const { isOpenComments, setIsOpenComments, postUuid, PostSelected, postOwner } = useComment();
    const CommentMenuRef = useRef<HTMLDivElement | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    const [userDetails, setUserDetails] = useState<UserDetailsTypes | null>(null);
    useEffect(() => {
        if(!postOwner) return;
        const unsubscribe = onSnapshot(doc(db, 'users', postOwner), (snapshot) => {
            if(snapshot.exists()){
                try{
                    setUserDetails(snapshot.data() as UserDetailsTypes);
                }catch(err){
                    alert(err)
                }
            }else{
                setUserDetails(null);
            }
        })
        return () => unsubscribe();
    },[postOwner]);

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
    const HandleCreateComment = async () => {
        try {
            const DocRef = doc(db, 'global', 'posts');
            const DocSnap = await getDoc(DocRef);

            const Posts = DocSnap.data()?.posts || [];

            // Find index of the selected post
            const index = Posts.findIndex((post: Post) => post.uuid === postUuid);
            if (index === -1) {
                toast.error("Post not founded!");
                return;
            }

            // Prepare the new comment
            const newComment = {
                uuid: uuid4(),
                text: textComment,
                createdAt: new Date().toISOString(),
                author: {
                    Name: name,
                    Email: email,
                    ProfileImage: profileimage,
                }
            };

            // Add the comment to the selected post
            const updatedPost = {
                ...Posts[index],
                comments: [...(Posts[index].comments || []), newComment],
            };

            // Replace the post in the array
            const updatedPosts = [...Posts];
            updatedPosts[index] = updatedPost;

            // Write the full array back
            await updateDoc(DocRef, { posts: updatedPosts });

            setTextComment('');
        } catch (error) {
            console.error("Failed to add comment:", error);
            toast.error("Error adding comment.");
        }
    };
    
    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        const currentUserEmail = Current_User?.data?.user?.email;
        if (!currentUserEmail || currentUserEmail === postOwner) return;

        const unsubscribe = onSnapshot(doc(db, "users", currentUserEmail), (docSnap) => {
            if (docSnap.exists()) {
            const following = docSnap.data()?.following || [];
            setIsFollowing(following.includes(postOwner));
            }
        });

        return () => unsubscribe();
    }, [postOwner, Current_User]);
    const ResultDate = getRelativeTime({ createdAt: PostSelected?.createdAt });
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
                    relative bg-neutral-900 rounded-3xl border border-neutral-800
                    overflow-x-hidden transition-all duration-500 ease-in-out
                    transform max-h-full
                    ${isOpenComments
                        ? "max-w-3xl max-h-[1000px] scale-100 opacity-100 p-0"
                        : "max-w-0 max-h-0 scale-95 opacity-0 p-4"
                    }
                `}
            >
                <section
                    className="w-full p-4"
                >
                    <div
                        className="flex items-center justify-between mb-4"
                    >
                        <div
                            className="flex items-center gap-2"
                        >
                            <div
                                className="relative"
                            >
                                <div
                                className="relative w-10 h-10 rounded-full 
                                    border overflow-hidden"
                                >
                                    <Image 
                                        src={userDetails?.profileimage as string || ""}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span
                                    className="absolute bottom-0 right-0
                                        bg-white text-black rounded-full cursor-pointer"
                                >
                                    <Plus
                                        size={14}
                                        className={postOwner.toLowerCase() === Current_User?.data?.user?.email ? "hidden" : isFollowing ? "hidden" : "flex"}
                                        onClick={async () => {
                                        const currentUserEmail = Current_User?.data?.user?.email;
                                        if (!currentUserEmail) return;
                                        await FollowButton(postOwner, currentUserEmail);
                                        }}
                                    />
                                </span>
                            </div>
                            <span
                                className="flex items-center gap-2"
                            >
                                <h1>{userDetails?.name}</h1>
                                <p
                                    className="text-neutral-500 text-sm"
                                >{ResultDate}</p>
                            </span>
                        </div>
                        <EllipsisVertical 
                            size={20}/>
                    </div>
                        <div
                            className="px-2 text-neutral-400"
                        >
                            <p>
                                {PostSelected?.whatsnew as string}
                            </p>
                        </div>
                    <div
                        className="w-full flex items-center justify-center"
                    >
                        <Image 
                            src={PostSelected?.imagepost as string || ""}
                            alt="Image Post"
                            width={400}
                            height={400}
                            className="object-contain rounded-2xl border border-neutral-800 overflow-hidden"
                        />
                    </div>
                </section>
                {PostSelected && PostSelected?.comments?.length > 0 ? PostSelected?.comments?.map((comment, index) => {
                    const DateCalculated = getRelativeTime({ createdAt: comment?.createdAt });
                    return (
                        <div 
                            key={comment?.uuid}
                            className={`flex items-start gap-4 p-4 border-neutral-800
                                ${index !== PostSelected?.comments?.length - 1 && "border-b"}`}>
                            <div className="relative w-10 h-10 rounded-full 
                                overflow-hidden border flex-shrink-0">
                                <Image 
                                    src={comment?.author?.ProfileImage}
                                    alt="Profile Image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <span className="flex items-center gap-2">
                                    <h1>{comment?.author?.Name}</h1>
                                    <p className="text-neutral-500 text-sm">{DateCalculated}</p>
                                </span>
                                <p>
                                    {comment?.text}
                                </p>
                                <div className="w-full flex items-center gap-6 pt-4">
                                    <span className="flex gap-1 cursor-pointer hover:scale-105 transition-all duration-200">
                                        <Heart size={16} />
                                    </span>
                                    <MessageCircle size={16} />
                                    <Repeat2 size={16} />
                                    <Navigation size={16} />
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                (
                    <div
                        className="w-full min-h-20 flex flex-col justify-center 
                            text-center text-xl text-neutral-500 items-center"
                    >
                        No comments yet !
                    </div>
                )}
            <div
                className="sticky bottom-0 left-0 w-full px-4
                    min-h-16 border-t border-neutral-800 flex 
                    bg-neutral-900
                    items-center gap-2"
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
                    autoFocus
                    className="grow"
                    placeholder="write comment here..."
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    >
                </textarea>
                <button
                    disabled={textComment === ''}
                    onClick={HandleCreateComment}
                    className="w-10 h-10 rounded-lg border
                        flex items-center justify-center 
                        cursor-pointer 
                        disabled:bg-neutral-800 
                        disabled:text-neutral-600 
                        disabled:cursor-not-allowed"
                >
                    <ArrowUp size={20}/>
                </button>
            </div>
            </section>
        </main>
    );
}
