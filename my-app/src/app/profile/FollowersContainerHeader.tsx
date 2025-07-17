"use client";
import { useEditProfile } from '@/context/OpenEditProfileContext';
import React from 'react';

const HeaderTabs = ["followers", "following"];
export default function FollowersContainerHeader() {
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
                            items-center py-4 cursor-pointer
                            transition-all duration-100
                            ${currentFTab === tab.toLowerCase() ? "font-bold border-b text-white" : "text-neutral-500"}`}
                    >
                        {tab}
                    </button>
                )
            })}
        </div>
    )
}
