import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/Components/SideBar";
import AddThread from "@/Components/AddThread";
import { MenuProvider } from "@/context/MenuContext";
import { ProviderSession } from "@/Components/ProviderSession";
import { getServerSession } from "next-auth";
import { CreatePostProvider } from "@/context/CreatePostContext";
import FeedTabs from "@/Components/FeedTabs";
import CreatePost from "@/Components/CreatePost";
import { AddTopicProvider } from "@/context/AddTopicContext";
import { Toaster } from "sonner";
import { UserInfoProvider } from "@/context/UserInfoContext";
import { CommentsContainer } from "@/Components/ComentsContainer";
import { CommentContextProvider } from "@/context/CommentsContext";

const geistSans = Inter({
  variable: "--font-inter-sans",
  weight: ["500", "600", "700", "900"], // 500: medium, 600: semibold, 700: bold, 900: black
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <ProviderSession>
        <body
          className={`${geistSans.variable} antialiased`}
        >
          <Toaster richColors position="top-center" />
              <CommentContextProvider>
                <UserInfoProvider>
                  <AddTopicProvider>
                    <CreatePostProvider>
                      <CreatePost />
                        <MenuProvider>
                          <FeedTabs />
                          <section className="w-full min-h-screen flex">
                            {session && <SideBar />}
                            {children}
                            <CommentsContainer />
                            {session && <AddThread />}
                          </section>
                        </MenuProvider>
                    </CreatePostProvider>
                  </AddTopicProvider>
                </UserInfoProvider>
              </CommentContextProvider>
        </body>
      </ProviderSession>
    </html>
  );
}
