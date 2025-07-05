'use client';
import { signOut } from "next-auth/react";

export function SignOutBtn() {
    return (
        <button
        onClick={() => signOut()}
        className="bg-red-600 py-2 px-4 w-full 
            cursor-pointer text-white text-xl rounded-lg 
            hover:bg-red-700 transition-colors"
        >
        Sign Out
        </button>
    );
}