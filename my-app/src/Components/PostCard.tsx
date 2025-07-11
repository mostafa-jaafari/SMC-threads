'use client';
import Image from "next/image";
import { getRelativeTime } from "./Functions/CalculateDateDifference";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { Ellipsis, Heart, MessageCircle, Navigation, Plus, Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/Firebase";
import { useSession } from "next-auth/react";
import { FollowButton } from "./Functions/FollowButton";
import Link from "next/link";


interface PostCardProps {
    PostOwner: string;
    createdAt: Timestamp;
    whatsnew: string;
    imagepost: string;
}
export default function PostCard({ createdAt, whatsnew, imagepost, PostOwner } : PostCardProps) {
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
    return (
        <main
            className="w-full flex items-start
                gap-4 p-4 border-b border-neutral-800"
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
                    className="relative flex items-center gap-2"
                    onMouseEnter={() => setIsNameHovered(true)}
                    onMouseLeave={() => setIsNameHovered(false)}
                    >
                    <h1 
                        className="capitalize font-semibold hover:underline cursor-pointer"
                    >
                        {userDetails?.name}
                    </h1>

                    <span className="text-neutral-500 text-sm">{Result}</span>

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
                    <Heart 
                        size={20}
                    />
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
            <Ellipsis
                size={24}
                className="text-neutral-500 hover:text-neutral-600 cursor-pointer"
            />
        </main>
    )
}