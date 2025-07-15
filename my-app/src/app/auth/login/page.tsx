import BlurText from "@/Components/TextAnimations/BlurText";
import Login_Form from "./Login_Form";
import Image from "next/image";




export default function page(){
    return (
        <main className="space-y-6 w-full min-h-screen flex flex-col items-center py-20">
            <Image 
                src="/PNG-LOGO-WHITE.png"
                alt="SMC Threads Logo"
                width={100}
                height={100}
                className="shadow-inner-overlay shadow-yellow-600"
            />
            <div className="text-center">
                <BlurText
                text="Welcome back to My Threads"
                delay={150}
                animateBy="words"
                direction="top"
                // onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-2"
                />
                <p className="text-neutral-600">
                    Your space for real News.
                </p>
            </div>
            <Login_Form />
        </main>
    )
}