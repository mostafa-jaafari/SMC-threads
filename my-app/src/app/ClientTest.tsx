'use client';
import { signIn, signOut } from "next-auth/react";



export default function ClientTest() {
    return (
        <main>
            <button
                onClick={() => signIn("google")}
                className="bg-blue-500 hover:bg-blue-700 cursor-pointer
                    text-white font-bold py-2 px-4 rounded"
            >
                Login By Google
            </button>
            <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-700 cursor-pointer"
            >
                Log Out
            </button>
        </main>
    )
}