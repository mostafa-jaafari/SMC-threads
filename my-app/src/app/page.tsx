// import { getServerSession } from "next-auth";

import { SignOut } from "@/Components/SignOut";

export default async function Home() {
  // const session = await getServerSession();
  return (
    <main>
      <SignOut />
    </main>
  );
}
