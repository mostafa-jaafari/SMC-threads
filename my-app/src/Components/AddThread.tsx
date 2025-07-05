'use client';
import { useCreatePost } from "@/context/CreatePostContext";
import { Plus } from "lucide-react";

export default function AddThread() {
    const { setIsCreatePostOpen } = useCreatePost();
    return (
        <button
            onClick={() => setIsCreatePostOpen(true)}
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