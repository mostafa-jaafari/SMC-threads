"use client";
import { ChartColumnBig, Instagram } from 'lucide-react';
import React from 'react'



export default function PublicProfileHeader() {
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
                        Mostafa Jaafari
                    </h1>
                    <p
                        className="text-neutral-300"
                    >
                        username
                    </p>
                </span>
                <div
                    className="relative w-18 h-18 flex-shrink-0 
                        rounded-full overflow-hidden border"
                ></div>
            </div>
            <div
                className="w-full py-4 flex items-center justify-between"
            >
                <span>
                    4 followers
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
                    className='w-full bg-neutral-200 text-neutral-900 cursor-pointer 
                        hover:bg-neutral-300 py-1.5 text-sm font-bold rounded-xl'
                >
                    Follow Back
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
