'use client';
import Image from "next/image";
import { getRelativeTime } from "./Functions/CalculateDateDifference";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { Bookmark, Bug, ChevronRight, EarOff, Ellipsis, EyeOff, Heart, Link2, MessageCircle, Navigation, Plus, Repeat2, UserMinus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { db } from "@/Firebase";
import { useSession } from "next-auth/react";
import { FollowButton } from "./Functions/FollowButton";
import Link from "next/link";
import { LikeToggleBtn } from "./Functions/LikeToggleBtn";


interface PostCardProps {
    PostOwner: string;
    createdAt: Timestamp;
    whatsnew: string;
    imagepost: string;
    Postuuid: string;
}
const Options_Links = [
    {
        label: "Add to feed",
        href: "/",
        icon: ChevronRight,
        isLink: false,
    },{
        label: "Save",
        href: "/",
        icon: Bookmark,
        isLink: true,
    },{
        label: "Not interested",
        href: "/",
        icon: EyeOff,
        isLink: true,
    },{
        label: "Mute",
        href: "/",
        icon: EarOff,
        isLink: true,
    },{
        label: "Unfollow",
        href: "/",
        icon: UserMinus,
        isLink: true,
    },{
        label: "Report",
        href: "/",
        icon: Bug,
        isLink: true,
    },{
        label: "Copy link",
        href: "/",
        icon: Link2,
        isLink: true,
    },
];
export default function PostCard({ createdAt, whatsnew, imagepost, PostOwner, Postuuid } : PostCardProps) {
    const Result = getRelativeTime(createdAt);
    const Current_User = useSession();
    const [userDetails, setUserDetails] = useState<any | null>(null);
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', PostOwner), (snapshot) => {
            if(snapshot.exists()){
                setUserDetails(snapshot.data());
            }else{
                setUserDetails(null);
            }
        })
        return () => unsubscribe();
    },[PostOwner]);

    const [isFollowing, setIsFollowing] = useState(false);
    useEffect(() => {
        const currentUserEmail = Current_User?.data?.user?.email;
        if (!currentUserEmail || currentUserEmail === PostOwner) return;

        const unsubscribe = onSnapshot(doc(db, "users", currentUserEmail), (docSnap) => {
            if (docSnap.exists()) {
            const following = docSnap.data()?.following || [];
            setIsFollowing(following.includes(PostOwner));
            }
        });

        return () => unsubscribe();
    }, [PostOwner, Current_User]);

    const [iSNameHovered, setIsNameHovered] = useState<boolean>(false);
    const [iSPostOptions, setIsPostOptions] = useState(false);
    const OptionMenuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const HideOptionMenu = (e: MouseEvent) => {
            if(OptionMenuRef.current && !OptionMenuRef.current.contains(e.target as Node)){
                setIsPostOptions(false);
            }
        }
        document.addEventListener('mousedown', HideOptionMenu);
        return () => removeEventListener('mousedown', HideOptionMenu);
    },[])
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    useEffect(() => {
        const CurrentUserEmail = Current_User?.data?.user?.email;
        const unsubscribe = onSnapshot(doc(db, "global", "posts"), (snapshot) => {
            const data = snapshot.data();
            const Posts = data?.posts || [];
            setIsLiked(Posts?.likes.includes(CurrentUserEmail));
            setLikesCount(Posts.length)
        })
        return () => unsubscribe();
    }, [Current_User?.data?.user?.email, PostOwner, Postuuid]);
    const handleLike = async () => {
        if(!Current_User?.data?.user?.email) return;
        await LikeToggleBtn(Current_User?.data?.user?.email, PostOwner, Postuuid);
    };
    return (
        <main
            className="w-full flex items-start
                gap-4 p-6 border-b border-neutral-800"
        >
            <div className="relative">
                <div 
                    className="relative overflow-hidden w-10 h-10 rounded-full border">
                        <Image 
                            src={userDetails?.profileimage}
                            alt="Profile Image"
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
                            className={PostOwner.toLowerCase() === Current_User?.data?.user?.email ? "hidden" : isFollowing ? "hidden" : "flex"}
                            onClick={async () => {
                            const currentUserEmail = Current_User?.data?.user?.email;
                            if (!currentUserEmail) return;
                            await FollowButton(PostOwner, currentUserEmail);
                            }}
                        />
                    </span>
            </div>
            <section
                className="w-full"
            >
                <div
                    className="flex items-center gap-1"
                >
                <div
                    className="relative w-max"
                    onMouseEnter={() => setIsNameHovered(true)}
                    onMouseLeave={() => setIsNameHovered(false)}
                    >
                    <h1 
                        className="capitalize font-semibold hover:underline cursor-pointer"
                    >
                        {userDetails?.name}
                    </h1>

                    {iSNameHovered && (
                        <div
                        className="absolute top-6 p-6 min-w-78 min-h-10 
                            bg-black space-y-3 rounded-xl border border-neutral-900 z-50"
                        >
                        <div className="w-full flex items-center justify-between">
                            <span>
                            <h1 className="text-xl font-semibold">{userDetails?.name}</h1>
                            <h3 className="text-sm">mostafa_jaafari</h3>
                            </span>
                            <div 
                                className="relative border w-16 h-16 
                                    rounded-full overflow-hidden">
                                <Image 
                                    src={userDetails?.profileimage}
                                    alt="Profile Image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <p className="text-neutral-500">{userDetails?.following?.length} followers</p>
                            {PostOwner === Current_User?.data?.user?.email ? (
                                <button
                                    className="w-full flex border border-neutral-900 
                                            py-1 rounded-lg hover:bg-neutral-800/20"
                                >
                                    <Link 
                                        href="/profile"
                                        className="w-full cursor-pointer"
                                        >
                                        Profile
                                    </Link>
                                </button>
                            ) 
                            :
                            <button
                                onClick={async () => {
                                const currentUserEmail = Current_User?.data?.user?.email;
                                if (!currentUserEmail) return;
                                await FollowButton(PostOwner, currentUserEmail);
                                }}
                                className="border rounded-xl border-neutral-800
                                w-full py-1 cursor-pointer text-neutral-500
                                hover:bg-neutral-800/20"
                                >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                            }
                        </div>
                    )}
                    </div>
                    <span className="text-neutral-500 text-sm">{Result}</span>
                </div>
                <p className="mb-4 mt-2">
                    {whatsnew}
                </p>
                <Image 
                    src={imagepost || ""}
                    alt="Post Image"
                    width={400}
                    height={400}
                    className="object-contain rounded-2xl border border-neutral-800 overflow-hidden"
                />
                <div
                    className="w-full flex items-center gap-6 pt-4"
                >
                    <span
                        className="flex gap-1"
                    >
                        <Heart 
                            size={20}
                            fill={isLiked ? "red" : "none"}
                            color={isLiked ? "red" : "currentColor"}
                            onClick={handleLike}
                        /> {likesCount}
                    </span>
                    <MessageCircle 
                        size={20}
                    />
                    <Repeat2
                        size={20}
                    />
                    <Navigation
                        size={20}
                    />
                </div>
            </section>
            <div
                className="relative"
            >
                <Ellipsis
                    onClick={() => setIsPostOptions(!iSPostOptions)}
                    size={24}
                    className="text-neutral-500 hover:text-neutral-600 cursor-pointer"
                />
                {iSPostOptions && (
                    <div
                        ref={OptionMenuRef}
                        className="absolute top-6 right-0 min-w-68 
                            min-h-10 p-4 rounded-xl bg-black border 
                            border-neutral-900 list-none flex flex-col justify-center items-start gap-1"
                    >
                        {Options_Links.map((nav, index) => {
                            if(!nav.isLink){
                                return (
                                    <div
                                        key={index}
                                        className="w-full pb-1 border-b border-neutral-900"
                                    >
                                        <li
                                            className="text-neutral-300 cursor-pointer flex items-center justify-between w-full
                                                p-2 rounded-xl hover:bg-neutral-900/40"
                                        >
                                            {nav.label}
                                            <nav.icon 
                                                size={20}
                                            />
                                    </li>
                                    </div>
                                )
                            }else{
                                return (
                                    <div
                                        key={index}
                                        className={`w-full
                                        ${nav.label.toLowerCase() === "not interested" || nav.label.toLowerCase() === "report" ? "pb-1 border-b border-neutral-900" : ""}`}
                                    >
                                        <Link
                                            href={nav.href}
                                            className="text-neutral-300 flex items-center justify-between w-full
                                                p-2 rounded-xl hover:bg-neutral-900/40"
                                        >
                                            {nav.label}
                                            <nav.icon 
                                                size={20}
                                            />
                                        </Link>
                                    </div>
                                )
                            }
                        })}
                    </div>
                )}
            </div>
        </main>
    )
}