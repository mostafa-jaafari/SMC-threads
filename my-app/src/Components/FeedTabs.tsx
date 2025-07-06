'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";



export default function FeedTabs() {
    const Pathname = usePathname();
    const showHeader = Pathname === '/' || Pathname === '/following';
    if(!showHeader) return null;
    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center gap-14 py-6 text-sm font-semibold">
            <Link href="/">
                For You
            </Link>
            <Link href="/following">
                Following
            </Link>
        </div>
    )
}