import Image from "next/image";
import ClientTest from "./ClientTest";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main>
      hello {session?.user?.name || "Guest"}!
      <ClientTest />
    </main>
  );
}
