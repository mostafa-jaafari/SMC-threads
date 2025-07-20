import HeaderMobile from "@/Components/HeaderMobile";
import PostsContainer from "@/Components/PostsContainer";

export async function generateMetadata({ params }: { params: Promise<{ pageid: string }> }) {
  const { pageid } = await params;

  return {
    title: pageid === "following" ? "Following Page | My Threads" : `${pageid} Page | My Threads`,
    description: "Catch up with the latest updates from the people you follow. The Following page shows a personalized feed of posts from your favorite creators, so you never miss a moment from the accounts that matter most to you.",
  };
}
export default async function page({ params }: { params: Promise<{ pageid: string }> }) {
    const { pageid: Page_Id } = await params;
    if(Page_Id === "following" || Page_Id === "") return (
        <main className="w-full">
            <HeaderMobile />
                <section 
                    className="w-full flex flex-col justify-center 
                    items-center lg:pt-16 md:pt-16 py-16"
                >
                <div 
                    className="lg:w-1/2 md:w-[70%] w-full
                    sticky top-0 lg:border md:border 
                    border-neutral-800 md:w-[600px] 
                    lg:w-[600px] overflow-hidden rounded-3xl">
                    <PostsContainer />
                </div>
            </section>
        </main>
    )
}