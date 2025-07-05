'use client';
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AddThread() {
    const pathname = usePathname();
    if(pathname.startsWith("/auth")) return null;
    return (
        <button
            onClick={() => alert("Add Thread Clicked")}
            className="fixed bottom-8 right-8 rounded-lg 
                cursor-pointer text-neutral-600 
                hover:text-white transition-all 
                duration-200 bg-neutral-800 
                hover:bg-neutral-900 p-4
                lg:block md:block hidden"
        >
            <Plus size={26}/>
        </button>
    )
}