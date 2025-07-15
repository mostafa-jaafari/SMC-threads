'use client';
import { Heart, House, Plus, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SideBarMenu from "./SideBarMenu";
import { useCreatePost } from "@/context/CreatePostContext";

const SideBar_Icons = [
    {
        icon: House,
        link: "/"
    },
    {
        icon: Search,
        link: "/search"
    },
    {
        icon: Plus,
        link: "#"
    },
    {
        icon: Heart,
        link: "/activity"
    },
    {
        icon: User,
        link: "/profile"
    }
]

export default function SideBar() {
    const [activePath, setActivePath] = useState<string>("");
    const pathname = usePathname();
    useEffect(() => {
        if (pathname) {
            setActivePath(pathname);
        }
    },[pathname]);

    const { isCreatePostOpen, setIsCreatePostOpen } = useCreatePost();
    return (
        <section 
            className="bg-black z-40 flex-shrink-0 lg:sticky fixed 
                md:sticky lg:left-0 lg:top-0 md:left-0 
                md:top-0 bottom-0 left-0 flex md:flex-col 
                lg:flex-col items-center md:justify-start 
                md:gap-30 lg:justify-start lg:gap-30 py-4 md:w-20 
                lg:w-20 w-full lg:h-screen md:h-screen 
                h-16
                justify-between">
            <Link href="/">
                <div 
                    className="hidden lg:flex md:flex relative cursor-pointer w-12 
                    h-12 transtion-all duration-300 hover:scale-105">
                    <Image 
                        src="/PNG-LOGO-WHITE.png"
                        alt="SMC Logo"
                        fill
                        className="object-contain p-2"
                        />
                </div>
            </Link>
            <ul 
                className="w-full md:w-max lg:w-max lg:px-0 md:px-0 px-10
                    flex lg:justify-center md:justify-center 
                    justify-between lg:flex-col
                    md:flex-col gap-4">
                {SideBar_Icons.map((item, index) => {
                    if(item.icon === Plus) {
                        return (
                            <button
                                onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}
                                className="rounded-lg cursor-pointer 
                                    text-neutral-600 hover:text-white transition-all duration-200
                                    bg-neutral-800 hover:bg-neutral-900 p-2.5"
                                key={index}>
                                <item.icon 
                                    size={26} 
                                />
                            </button>
                        )
                    }
                    return (
                        <Link 
                            key={index} 
                            href={item.link}
                            className={`p-2.5 rounded-lg transition-all duration-300
                                ${activePath === item.link ? 'text-white border border-neutral-900 bg-neutral-900/40' : 'hover:bg-neutral-900 text-neutral-600'}`}
                            >
                            <item.icon 
                                size={26} />
                        </Link>
                    )
                })}
            </ul>
            <SideBarMenu
                MENUCLASSNAME="absolute left-20 bottom-10"
                BUTTONCLASSNAME="fixed bottom-7 left-7"
                CLASSNAME="hidden lg:block md:block"
            />
        </section>
    )
}