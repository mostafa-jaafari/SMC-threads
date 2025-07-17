"use client";
import { useEditProfile } from '@/context/OpenEditProfileContext';
import React from 'react';


interface FollowersContainerHeaderTypes{
    FollowersLength: number;
    FollowingLength: number;
}
const HeaderTabs = ["followers", "following"];
export default function FollowersContainerHeader({ FollowersLength, FollowingLength }: FollowersContainerHeaderTypes) {
    const { setCurrentFTab, currentFTab } = useEditProfile();
    
    return (
        <div
            className='w-full flex border-b border-neutral-800'
        >
            {HeaderTabs.map((tab, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentFTab(tab.toLowerCase())}
                        className={`w-full flex flex-col
                            items-center py-2 cursor-pointer
                            transition-all duration-100
                            ${currentFTab === tab.toLowerCase() ? "font-bold border-b text-white" : "text-neutral-500"}`}
                    >
                        <h2>
                            {tab}
                        </h2>
                        <span
                            className='font-thin text-xs'
                        >
                            {tab === "followers" ? FollowersLength : FollowingLength}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
