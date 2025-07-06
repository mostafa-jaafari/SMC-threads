import HeaderMobile from "@/Components/HeaderMobile";


interface PageProps {
        params: {
            pageid: string;
        }
    }
export default function page({ params } : PageProps) {
    const Page_Id = params.pageid;
    let content;
    switch (Page_Id) {
        case '':
            content = <main className="w-full lg:pt-16 md:pt-16 pt-20"> Home page </main>;
            break;
        case 'following':
            content = <main className="w-full lg:pt-16 md:pt-16 pt-20"> Following Page </main>;
            break;
            default:
                break;
        }
    return (
        <main className="w-full">
            <HeaderMobile />
            <section>
                {content}
            </section>
        </main>
    )
}