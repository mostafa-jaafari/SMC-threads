'use client';
import Image from "next/image";
import { getRelativeTime } from "./Functions/CalculateDateDifference";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { Ellipsis, Heart, MessageCircle, Navigation, Plus, Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/Firebase";
import { useSession } from "next-auth/react";
import { FollowButton } from "./Functions/FollowButton";


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
    },[PostOwner])
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
                            className={PostOwner.toLowerCase() === Current_User?.data?.user?.email ? "hidden" : "flex"}
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
                    className="flex items-center gap-2"
                >
                    <h1 
                        className="capitalize font-semibold"
                    >
                        {userDetails?.name}
                    </h1>
                    <span
                        className="text-neutral-500 text-sm"
                    >
                        {Result}
                    </span>
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