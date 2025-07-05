'use client';
import { signOut } from "next-auth/react";


export function SignOut() {
    return (
        <button
        onClick={() => signOut()}
        className="flex items-center justify-center gap-4 border 
                     border-neutral-800 rounded-lg px-4 py-3 w-full
                     hover:bg-black cursor-pointer
                     bg-black/30 text-md"
        >
        Sign Out
        </button>
    );
}