'use client';
import { signIn } from "next-auth/react";



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
        </main>
    )
}