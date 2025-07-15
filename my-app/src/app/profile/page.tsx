import HeaderMobile from "@/Components/HeaderMobile";
import ProfileHeader from "./ProfileHeader ";
import { EditProfile } from "@/Components/EditProfile";




export default function page(){
    return (
        <main
            className="w-full flex flex-col justify-start items-center"
        >
            <HeaderMobile />
            <div
                className="py-4"
            >
                Profile
            </div>
            <section
                className="lg:w-1/2 md:w-[70%] w-full
                    sticky top-0 lg:border md:border 
                    border-neutral-800 md:w-[600px] 
                    lg:w-[600px] overflow-hidden rounded-3xl"
            >
                <div
                    className="p-6"
                >
                    <ProfileHeader />
                </div>
            </section>
            <EditProfile />
        </main>
    )
}