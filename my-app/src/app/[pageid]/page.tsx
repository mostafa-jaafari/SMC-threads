import HeaderMobile from "@/Components/HeaderMobile";
import PostsContainer from "@/Components/PostsContainer";

export default async function page({ params }: { params: Promise<{ pageid: string }> }) {
    const { pageid: Page_Id } = await params;
    let content;
    switch (Page_Id) {
        case '':
            content = <main className="w-full lg:pt-16 md:pt-16 pt-20"> Home page </main>;
            break;
        case 'following':
            content = <section 
                      className="w-full flex flex-col justify-center 
                        items-center lg:pt-16 md:pt-16 py-16
                        ">
                      <div 
                        className="lg:w-1/2 md:w-[70%] w-full
                        sticky top-0 lg:border md:border 
                        border-neutral-800 md:w-[600px] 
                        lg:w-[600px] overflow-hidden rounded-3xl">
                        <PostsContainer />
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