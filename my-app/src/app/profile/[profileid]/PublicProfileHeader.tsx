"use client";
import { FollowButton } from '@/Components/Functions/FollowButton';
import { UserInfoContextProps, useUserInfo } from '@/context/UserInfoContext';
import { db } from '@/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ChartColumnBig, Instagram } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'



export default function PublicProfileHeader({ UserName }: { UserName: string; }) {
    const Current_User = useSession()?.data?.user?.email;
    const [UserDetails, setUserDetails] = useState<UserInfoContextProps | null>(null);
    const [loading, setLoading] = useState(false);
    const { Following } = useUserInfo();
    useEffect(() => {
        if (!UserName) return;

        const fetchUser = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "users"), where("username", "==", UserName));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
            setUserDetails(snapshot?.docs[0].data() as UserInfoContextProps);
            } else {
            setUserDetails(null); // لم يتم العثور على مستخدم
            }
        } catch (error) {
            console.error("❌ Error fetching user by username:", error);
            }
            setLoading(false);
        };
        
        fetchUser();
    }, [UserName]);
    const IsFollowed = UserDetails && Following?.includes(UserDetails?.email);
    return (
        <section>
            <div
                className="p-6"
            >
                <div
                    className="flex items-center justify-between"
                >
                    <span>
                        <h1
                            className="font-bold text-2xl"
                        >
                            {loading ? (
                                <div className='w-45 h-6 rounded-md bg-neutral-900 animate-pulse'/>
                            ) : UserDetails?.name}
                        </h1>
                        <p
                            className="text-neutral-300"
                        >
                            {loading ? (
                                <div className='w-28 h-4 mt-2 rounded-md bg-neutral-900 animate-pulse'/>
                            )
                            :
                            UserDetails?.username}
                        </p>
                    </span>
                    {loading ? (
                                <div className='w-18 h-18 rounded-full border border-neutral-800 bg-neutral-900 animate-pulse'/>
                            )
                            :
                            (
                                <div
                        className="relative w-18 h-18 flex-shrink-0 
                            rounded-full overflow-hidden border"
                    >
                        <Image 
                            src={UserDetails?.profileimage as string}
                            alt={UserDetails?.username as string}
                            fill
                            loading='lazy'
                            className='object-cover'
                        />
                    </div>
                    )}
                </div>
                <p
                    className='text-neutral-500 font-bold'
                >
                    {UserDetails?.profilebio}
                </p>
                <div
                    className="w-full py-4 flex items-center justify-between"
                >
                    <span
                        className="text-neutral-500 text-sm hover:underline cursor-pointer"
                    >
                        {UserDetails?.Followers?.length} followers
                    </span>
                    <div
                        className='flex items-center gap-2'
                    >
                        <span
                            className='rounded-full hover:bg-neutral-900 
                                cursor-pointer p-2'
                        >
                            <ChartColumnBig 
                                size={24}
                            />
                        </span>
                        <span
                            className='rounded-full hover:bg-neutral-900 
                                cursor-pointer p-2'
                        >
                            <Instagram 
                                size={24}
                                />
                        </span>
                    </div>
                </div>
                <div
                    className='w-full flex gap-2 items-center justify-between'
                >
                    <button
                        onClick={async () => {
                            if(!UserDetails || !Current_User) return;
                            await FollowButton(UserDetails?.email, Current_User);
                            }}
                        className={`w-full cursor-pointer border
                            py-1.5 text-sm font-bold rounded-xl
                            ${loading ? "text-neutral-800 bg-neutral-900 border-neutral-800 animate-pulse" : IsFollowed ? "border-neutral-800 hover:border-neutral-900 text-neutral-500" : "border-neutral-800 bg-neutral-900/50 text-neutral-200"}`}
                    >
                        {loading ? "..." : IsFollowed ? "Following" : "Follow"}
                    </button>
                    <button
                        className='w-full bg-neutral-800 border border-neutral-700 
                            text-neutral-400 cursor-pointer py-1.5 text-sm 
                            hover:bg-neutral-900 font-bold rounded-xl'
                    >
                        Mention
                    </button>
                </div>
            </div>
        </section>
    )
}
