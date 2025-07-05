'use client';
import SideBarMenu from "./SideBarMenu";


export default function HeaderMobile() {
    return (
        <section className="w-full flex justify-end">
          <div className="w-1/2 flex justify-between items-center py-2 pr-10">
            <img 
              src="/PNG-LOGO-WHITE.png"
              alt="SMC Logo"
              className="w-10 h-10 object-contain"
            />
            <SideBarMenu
                MENUCLASSNAME="absolute -left-14 top-14"
                BUTTONCLASSNAME="fixed top-7 right-7"
                CLASSNAME="absolute top-0 block bg-red-500 lg:hidden md:hidden"
            />
          </div>
        </section>
    )
}