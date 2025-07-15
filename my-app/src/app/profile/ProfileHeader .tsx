import { Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'



export default function ProfileHeader () {
  return (
    <section>
        <div
            className='w-full flex items-start justify-between'
        >
            <span>
                <h1
                    className='text-2xl font-semibold'
                >
                    Mostafa Jaafari
                </h1>
                <h2
                >
                    mostafa_jaafari
                </h2>
            </span>
            <div
                className='relative w-20 h-20 overflow-hidden 
                    rounded-full border'
            >
                {/* <Image 
                    src={}
                    alt=''
                    fill
                    className='object-cover'
                /> */}
            </div>
        </div>
        <div
            className='py-4 max-w-[80%]'
        >
            <p>
                Passionate web developer 💻
                skilled in React ⚛️, Next.js 🚀,
                and responsive design 📱,
                creating clean,
                user-friendly websites 🌐.
            </p>
            <div
                className='flex items-center gap-2 pt-2'
            >
                {["fitness", "learning", "development"].map((item, idx) => {
                    return (
                        <button
                            key={idx}
                            className='py-1 px-4 rounded-full border border-neutral-800'
                        >
                            {item}
                        </button>
                    )
                })}
                <button
                    className='py-1 px-4 rounded-full border border-neutral-800'
                >
                    <Plus size={14}/>
                </button>
            </div>
        </div>
    </section>
  )
}
