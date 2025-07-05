// import { getServerSession } from "next-auth";

import CreatePost from "@/Components/CreatePost";
import HeaderMobile from "@/Components/HeaderMobile";

export default async function Home() {
  // const session = await getServerSession();
  return (
    <main className="w-full">
        <HeaderMobile />
        <CreatePost />
    </main>
  );
}
