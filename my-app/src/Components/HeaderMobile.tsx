'use client';
import Link from "next/link";
import SideBarMenu from "./SideBarMenu";
import Image from "next/image";


export default function HeaderMobile() {
    return (
        <section className="bg-[#0A0A0A]/90 backdrop-blur-[10px] sticky top-0 z-50 w-full flex justify-end">
          <div className="lg:hidden md:hidden block w-1/2 flex justify-between items-center py-2 pr-10">
            <Link href="/">
              <div 
                className="lg:hidden md:hidden flex relative cursor-pointer w-12 
                  h-12 transtion-all duration-300 hover:scale-105">
                <Image 
                    src="/PNG-LOGO-WHITE.png"
                    alt="SMC Logo"
                    fill
                    className="object-contain p-2"
                    />
            </div>
            </Link>
            <SideBarMenu
                MENUCLASSNAME="absolute -left-14 top-14"
                BUTTONCLASSNAME="fixed top-7 right-7"
                CLASSNAME="absolute top-0 block bg-red-500 lg:hidden md:hidden"
            />
          </div>
        </section>
    )
}