'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";



export default function FeedTabs() {
    const Pathname = usePathname();
    const showHeader = Pathname === '/' || Pathname === '/following';
    const [activePath, setActivePath] = useState("/");
    useEffect(() => {
        if (Pathname) {
            setActivePath(Pathname);
    }
    },[Pathname])
    if(!showHeader) return null;
    return (
        <div 
            className="h-14 lg:border-none md:border-none 
                border-b-2 border-neutral-700 
                fixed top-16 md:top-0 lg:top-0 
                md:left-0 lg:left-0 w-full 
                flex items-center justify-center 
                lg:gap-14 md:gap-14 text-sm font-semibold">
            <Link 
                className={`lg:w-max md:w-max h-full 
                    lg:w-max md:w-max w-full flex 
                    justify-center items-center
                    ${activePath === "/" ? "lg:border-none md:border-none border-b text-neutral-300" : "text-neutral-600"}`}
                href="/">
                For You
            </Link>
            <Link 
                className={`lg:w-max md:w-max h-full 
                    w-full flex justify-center 
                    items-center
                    ${activePath === "/following" ? "lg:border-none md:border-none border-b text-neutral-300" : "text-neutral-600"}`}
                href="/following">
                Following
            </Link>
        </div>
    )
}