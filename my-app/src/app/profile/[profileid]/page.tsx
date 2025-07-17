import HeaderMobile from "@/Components/HeaderMobile";
import PublicProfileHeader from "./PublicProfileHeader";



export default async function page({ params }: { params: Promise<{ profileid: string }> }) {
    const { profileid: Page_Id } = await params;
    return (
        <main className="w-full min-h-screen flex flex-col items-center">
            <div
                className="w-full flex flex-col justify-start items-center"
            >
                <HeaderMobile />
            </div>
            <section
                className="lg:w-1/2 md:w-[70%] w-full
                    sticky top-0 lg:border md:border 
                    border-neutral-800 md:w-[600px]
                    lg:w-[600px] overflow-hidden rounded-3xl"
            >
                <PublicProfileHeader />
            </section>
        </main>
    )
}