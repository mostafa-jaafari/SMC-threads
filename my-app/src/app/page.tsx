import HeaderMobile from "@/Components/HeaderMobile";
import PostsContainer from "@/Components/PostsContainer";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "For You | My Threads",
  description: "Discover trending posts and fresh content tailored just for you. Our For You page delivers the latest from across the platform, helping you explore popular creators, viral topics, and engaging media — all powered by your interests.",
  openGraph: {
    title: "For You | Your Social Feed",
    description: "Discover trending posts and fresh content tailored to your interests. Stay updated with what's hot across the platform.",
    url: "https://mythreads-sooty.vercel.app",
    siteName: "YourAppName",
    images: [
      {
        url: "https://mythreads-sooty.vercel.app/FacebookIcon.png",
        alt: "Facebook",
      },
      {
        url: "https://mythreads-sooty.vercel.app/GithubIcon.png",
        alt: "Github",
      },
      {
        url: "https://mythreads-sooty.vercel.app/GoogleIcon.png",
        alt: "Google",
      },
    ],
    type: "website",
  },
};

export default async function Home() {
  return (
    <main className="w-full pb-14">
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
            <PostsContainer />
          </div>
        </section>
    </main>
  );
}
