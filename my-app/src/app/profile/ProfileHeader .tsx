"use client";
import { useUserInfo } from '@/context/UserInfoContext';
import { ChartColumnBig, Instagram, Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'



export default function ProfileHeader () {
    const { name, profileimage, profilebio, interests } = useUserInfo();
  return (
    <section>
        <div
            className='w-full flex items-start justify-between'
        >
            <span>
                <h1
                    className='text-2xl font-semibold'
                >
                    {name}
                </h1>
                <h2
                >
                    mostafa_jaafari
                </h2>
            </span>
            <div
                className='relative w-20 h-20 overflow-hidden 
                    rounded-full border'
            >
                <Image 
                    src={profileimage}
                    alt=''
                    fill
                    className='object-cover'
                />
            </div>
        </div>
        <div
            className='py-4 max-w-[80%]'
        >
            {profilebio !== "" && profilebio ? (
                <p>
                    {profilebio}
                </p>
            )
            :
            (
                <p
                    className='text-neutral-500'
                >
                    Edit profile and add Bio.
                </p>
            )}
            <div
                className='flex items-center gap-2 pt-2'
            >
                {interests && interests.length > 0 && interests.map((item, idx) => {
                    return (
                        <button
                            key={idx}
                            className='py-1 px-4 rounded-full border 
                                hover:bg-neutral-900/50 cursor-pointer
                                border-neutral-800'
                        >
                            {item}
                        </button>
                    )
                })}
                <button
                    className='py-2 px-4 rounded-full 
                        hover:bg-neutral-900/50 cursor-pointer
                        border border-neutral-800'
                >
                    <Plus size={14}/>
                </button>
            </div>
        </div>
        <div
            className='w-full flex items-center justify-between'
        >
            <div
                className='flex items-center gap-2'
            >
                <div
                    className='flex items-center -space-x-1'
                >
                    {Array(3).fill(0).map((_, idx) => {
                        return (
                            <div
                                key={idx}
                                className='relative w-4 h-4 overflow-hidden 
                                    rounded-full border border-neutral-800'
                            ></div>
                        )
                    })}
                </div>
                <h1
                    className='text-neutral-500 text-sm hover:underline cursor-pointer'
                >
                    Followers
                </h1>
            </div>
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
            className='pt-2'
        >
            <button
                className='cursor-pointer border border-neutral-800 
                    w-full flex justify-center text-sm font-semibold 
                    py-1.5 rounded-lg'
            >
                Edit Profile
            </button>
        </div>
    </section>
  )
}
