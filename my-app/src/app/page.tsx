import CreatePost from "@/Components/CreatePost";
import HeaderMobile from "@/Components/HeaderMobile";

export default async function Home() {
  // const session = await getServerSession();
  return (
    <main className="w-full">
        <HeaderMobile />
        <CreatePost />
        <section className="w-full bg-red-500/20">
          test
        </section>
    </main>
  );
}
