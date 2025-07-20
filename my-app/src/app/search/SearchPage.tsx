"use client";

import { ArrowLeft, ListFilterPlus, Search } from "lucide-react";
import { useRouter } from "next/navigation";



export function SearchPage(){
    const router = useRouter();
    return (
        <section>
            {/* --- Back Section --- */}
            <div
                className="w-full p-4"
            >
                <span
                    onClick={() => router.back()}
                    className='flex w-max rounded-full bg-transparent 
                        hover:bg-neutral-900 cursor-pointer border 
                        p-0.5 border-neutral-700'
                >
                    <ArrowLeft size={20}/>
                </span>
            </div>
            {/* --- Search Body Section --- */}
            <div
                className="lg:w-1/2 md:w-[70%] w-full
                    sticky top-0 lg:border md:border 
                    border-neutral-800 md:w-[600px] bg-neutral-900
                    lg:w-[600px] overflow-hidden rounded-3xl"
            >
                {/* --- Input section --- */}
                <div
                    className="p-6"
                >
                    <div
                        className="group border border-neutral-800
                            focus-within:border-neutral-700
                            w-full rounded-xl 
                            flex items-center bg-[#0A0A0A]"
                    >
                        <label
                            htmlFor="Search"
                            className="px-4 text-neutral-700"
                        >
                            <Search size={20} />
                        </label>
                        <input 
                            id="Search"
                            type="text"
                            className="w-full outline-none py-2"
                        />
                        <span
                            className="px-4 text-neutral-500"
                        >
                            <ListFilterPlus size={26} />
                        </span>
                    </div>
                </div>

                {/*  */}
                <div>
                    <h1
                        className="px-6 font-bold text-sm text-neutral-500"
                    >
                        Follow suggestions
                    </h1>

                    {/* --- Follow suggestions --- */}
                    <div>
                        {/* --- parent --- */}
                        <div
                            className="pl-6 flex gap-4"
                        >
                            {/* --- Image Profile --- */}
                            <div
                                className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border"
                            ></div>
                            {/* --- Middle Content Follow Suggestion --- */}
                            <div
                                className="space-y-6"
                            >
                                <div
                                    className="w-full flex justify-between items-center"
                                >
                                    <span>
                                        <h1>Mostafa Jaafari</h1>
                                        <h2>username</h2>
                                    </span>
                                    <button>
                                        Follow
                                    </button>
                                </div>
                                <p
                                    className="text-neutral-300"
                                >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Nisi iusto in quo mollitia quaerat. Optio ut excepturi 
                                    sequi voluptas modi?
                                </p>
                                <div
                                    className="flex items-center gap-1"
                                >
                                    <div
                                        className="flex items-center -space-x-1"
                                    >
                                        {Array(3).fill(0).map((_, idx) => {
                                            return (
                                                <span
                                                    key={idx}
                                                    className="w-4 h-4 rounded-full border border-neutral-700"
                                                />
                                            )
                                        })}
                                    </div>
                                    <p
                                        className="text-neutral-500"
                                    >
                                        223K followers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}