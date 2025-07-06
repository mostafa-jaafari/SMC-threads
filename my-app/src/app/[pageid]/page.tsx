import HeaderMobile from "@/Components/HeaderMobile";
import PostsContainer from "@/Components/PostsContainer";
import { getServerSession } from "next-auth";


interface PageProps {
        params: {
            pageid: string;
        }
    }
export default async function page({ params } : PageProps) {
    const Page_Id = params.pageid;
    const session = await getServerSession();
    let content;
    switch (Page_Id) {
        case '':
            content = <main className="w-full lg:pt-16 md:pt-16 pt-20"> Home page </main>;
            break;
        case 'following':
            content = <section 
                      className="w-full flex flex-col justify-center 
                        items-center lg:pt-16 md:pt-16 pt-20
                        ">
                      <div 
                        className="lg:w-1/2 md:w-[70%] sm:w-[80%] w-[90%] bg-neutral-900 border border-neutral-800 md:w-[600px]lg:w-[600px] 
                          overflow-hidden rounded-3xl">
                        <PostsContainer
                          session={session ? { user: { image: session.user?.image ?? undefined, name: session.user?.name ?? undefined } } : { user: { image: undefined, name: undefined } }}
                        />
                      </div>
                    </section>
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