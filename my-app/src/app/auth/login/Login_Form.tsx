'use client';
import { signIn } from "next-auth/react";



export default function Login_Form() {
    const Fixed_Login_Logos = [
        {
            image: "/PNG-LOGO-WHITE.png",
            alt: "SMC Threads Logo",
            className: "fixed -left-5 blur-[2px] -top-5 w-[120px] rotate-45"
        },
        {
            image: "/PNG-LOGO-WHITE.png",
            alt: "SMC Threads Logo",
            className: "fixed -right-5 blur-[2px] -bottom-5 w-[120px] rotate-45"
        },
        // {
        //     image: "./PNG-LOGO-WHITE.png",
        //     alt: "SMC Threads Logo",
        //     className: "fixed left-0 top-0 w-[60px]"
        // },
        // {
        //     image: "./PNG-LOGO-WHITE.png",
        //     alt: "SMC Threads Logo",
        //     className: "fixed left-0 top-0 w-[60px]"
        // },
    ];
    return (
        <main className="w-full max-w-[500px] px-10">
            {Fixed_Login_Logos.map((logo, index) => {
                return (
                    <img 
                        key={index}
                        src={logo.image}
                        alt={logo.alt}
                        className={logo.className}
                    />
                )
            })}
            <section className="space-y-2">
                <button 
                    onClick={() => signIn('google')}
                    className="flex items-center justify-center gap-4 border 
                        border-neutral-800 rounded-lg px-4 py-3 w-full
                        hover:bg-black cursor-pointer
                        bg-black/30 text-md">
                    <img 
                        src="/GoogleIcon.png"
                        alt="Google Logo"
                        className="w-6 h-6"
                    />
                    Login with Google
                </button>
                <button 
                    onClick={() => signIn('github')}
                    className="flex items-center justify-center gap-4 border 
                        border-neutral-800 rounded-lg px-4 py-3 w-full
                        hover:bg-black cursor-pointer
                        bg-black/30 text-md">
                    <img 
                        src="/FacebookIcon.png"
                        alt="Facebook Logo"
                        className="w-6 h-6"
                    />
                    Login with X
                </button>
            </section>
        </main>
    )
}