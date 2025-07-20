import HeaderMobile from "@/Components/HeaderMobile";
import PublicProfile from "./PublicProfile";


interface PageProps { 
    params: Promise<{ profileid: string }>
}
export default async function page({ params }: PageProps) {
    const { profileid: Page_Id } = await params;
    return (
        <main className="w-full min-h-screen flex flex-col items-center">
            <div
                className="w-full flex flex-col justify-start items-center"
            >
                <HeaderMobile />
            </div>
            <PublicProfile
                UserName={Page_Id}
            />
        </main>
    )
}