import CreatePost from "@/Components/CreatePost";
import HeaderMobile from "@/Components/HeaderMobile";
import PostsContainer from "@/Components/PostsContainer";

export default async function Home() {
  return (
    <main className="w-full">
        <HeaderMobile />
        <CreatePost />
        <section 
          className="w-full flex flex-col justify-center 
            items-center lg:pt-16 md:pt-16 pt-20
            ">
          <div 
            className="w-full md:w-[600px]lg:w-[600px] 
              overflow-hidden rounded-2xl">
            <PostsContainer />
          </div>
        </section>
    </main>
  );
}
