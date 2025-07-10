import HeaderMobile from "@/Components/HeaderMobile";
import PostsContainer from "@/Components/PostsContainer";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="w-full">
        <HeaderMobile />
        <section 
          className="w-full min-h-screen flex flex-col justify-center 
            items-center lg:pt-16 md:pt-16 pt-20"
        >
          <div 
            className="lg:w-1/2 md:w-[70%] w-full
              sticky top-0 lg:border md:border 
              border-neutral-800 md:w-[600px] 
              lg:w-[600px] overflow-hidden rounded-3xl">
            <PostsContainer
              session={session ? { user: { image: session.user?.image ?? undefined, name: session.user?.name ?? undefined } } : { user: { image: undefined, name: undefined } }}
            />
          </div>
        </section>
    </main>
  );
}
