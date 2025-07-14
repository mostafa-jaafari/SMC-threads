import { useMenu } from "@/context/MenuContext";
import { AlignRight, ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef } from "react";



interface SideBarMenuProps {
    CLASSNAME: string;
    BUTTONCLASSNAME: string;
    MENUCLASSNAME: string;
}

const SideBar_Menu_Links = [
    {
        label: "Appearance",
        link: "#",
        islink: false,
    },{
        label: "Insights",
        link: "/insights",
        islink: true,
    },{
        label: "Settings",
        link: "/settings",
        islink: true,
    },{
        label: "Feeds",
        link: "#",
        islink: false,
    },{
        label: "Saved",
        link: "/saved",
        islink: true,
    },{
        label: "Liked",
        link: "/liked",
        islink: true,
    },{
        label: "Report a problem",
        link: "/report",
        islink: true,
    },{
        label: "Log out",
        link: "#",
        islink: false,
    },
];
export default function SideBarMenu({ CLASSNAME, BUTTONCLASSNAME, MENUCLASSNAME }: SideBarMenuProps) {
    const { isMenuOpen, setIsMenuOpen } = useMenu();
    const MenuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
    const hidemenu = (e: MouseEvent) => {
        if(MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
            setIsMenuOpen(false);
        }
    }
    
    // استخدم setTimeout لتأخير إضافة الـ event listener
    const timer = setTimeout(() => {
        document.addEventListener("click", hidemenu);
    }, 0);
    
    return () => {
        clearTimeout(timer);
        document.removeEventListener("click", hidemenu);
    }
}, [isMenuOpen, setIsMenuOpen]);
    const HandleMenuLinkClick = (item: string) => {
        if(item.toLowerCase() === "log out") {
            signOut();
        }
    }
    return (
        <main className={CLASSNAME}>
            <span 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${BUTTONCLASSNAME} z-50 text-neutral-600 cursor-pointer 
                    hover:text-white transition-all duration-300`}>
                <AlignRight size={24} />
            </span>
            {isMenuOpen && (
                <section 
                    ref={MenuRef}
                    className={`bg-black z-50 border border-neutral-900 
                        rounded-lg p-4 w-60 space-y-1
                        ${MENUCLASSNAME}`}>
                    {SideBar_Menu_Links.map((item, index) => {
                            if(item.label.toLowerCase() === "feeds" || item.label.toLowerCase() === "report a problem") {
                                return (
                                    <div
                                        key={index}
                                    >
                                        <hr 
                                            className="w-full border-neutral-900"
                                        />
                                        <button
                                            onClick={() => alert(`${item.label} clicked`)}
                                            className={`flex justify-between items-center transition-all duration-300 
                                                block py-2 px-4 rounded-lg
                                                w-full text-left mt-1
                                                ${item.label === "Log out" ? "text-red-500 hover:text-red-600 cursor-pointer" : "text-neutral-200 hover:text-white hover:bg-neutral-900/40"}
                                                `}>
                                            {item.label} {item.label !== "Log out" && <ChevronRight size={16} />}
                                        </button>
                                    </div>
                                )
                            }
                            if(item.islink){
                                return (
                                    <Link
                                        key={index}
                                        href={item.link}
                                        className="text-neutral-200 hover:text-white transition-all duration-300 
                                            block py-2 px-4 rounded-lg
                                            hover:bg-neutral-900/40">
                                        {item.label}
                                    </Link>
                                )
                            }
                            return (
                                <button
                                    key={index}
                                    onClick={() => HandleMenuLinkClick(item.label)}
                                    className={`flex justify-between items-center transition-all duration-300 
                                        block py-2 px-4 rounded-lg
                                        w-full text-left
                                        ${item.label === "Log out" ? "text-red-500 hover:text-red-600 cursor-pointer" : "text-neutral-200 hover:bg-neutral-900/40"}
                                        `}>
                                    {item.label} {item.label !== "Log out" && <ChevronRight size={16} />}
                                </button>
                            )
                    })}
                </section>
            )}
        </main>
    )
}