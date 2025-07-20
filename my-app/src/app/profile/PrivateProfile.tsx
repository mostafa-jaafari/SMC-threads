"use client";
import { useCreatePost } from '@/context/CreatePostContext';
import { useEditProfile } from '@/context/OpenEditProfileContext';
import { useUserInfo } from '@/context/UserInfoContext';
import { ChartColumnBig, Instagram, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import RepliesPage from './Pages/RepliesPage';
import MediaPage from './Pages/MediaPage';
import ReportsPage from './Pages/ReportsPage';
import ThreadsPage from './Pages/ThreadsPage';

const Profile_Tabs = [
    "Threads",
    "Replies",
    "Media",
    "Reports"
];
export default function ProfileHeader () {
    const { name, username, profileimage, profilebio, interests, isLoadingUserData } = useUserInfo();
    const { setIsOpenEditProfile, setTabName, setShowfollowersMenu, treeFollowers } = useEditProfile();
    const { setIsCreatePostOpen } = useCreatePost();

    const router = useRouter();
    
    const params = useSearchParams().get("tab") || "threads";
    const HandleChangeProfileTab = (Tab: string) => {
        router.push(Tab.toLowerCase() !== "threads" ? `/profile?tab=${Tab.toLowerCase()}` : "/profile")
    }
    const HandleAddInterests = async () => {
        await setIsOpenEditProfile(true);
        setTabName('interests')
    }

    let RenderTabs;
    switch (params.toLowerCase()) {
        case "replies":
            RenderTabs = (
                <RepliesPage />
            )
            break;
        case "media":
            RenderTabs = (
                <MediaPage />
            )
            break;
        case "threads":
            RenderTabs = (
                <ThreadsPage />
            )
            break;
        case "reports":
            RenderTabs = (
                <ReportsPage />
            )
            break;
            default:
            RenderTabs = (
                <div
                    className='text-neutral-500 w-full flex justify-center'
                >
                    Sorry &apos;{`${params.toLowerCase()}`}&apos; Page Note Founded
                </div>
            )
            break;
    }
  return (
    <section>
        <div
            className='p-6'
            >
            <div
                className='w-full flex items-start justify-between'
            >
                <span>
                    {isLoadingUserData ? (
                        <div className="h-6 w-44 bg-neutral-800 rounded-md animate-pulse" />
                    )
                    :
                    (
                        <h1
                        className='text-2xl font-semibold'
                        >
                        {name}
                    </h1>
                    )}
                    {isLoadingUserData ? (
                        <div className="h-6 w-34 mt-2 bg-neutral-800 rounded-md animate-pulse" />
                    )
                    :
                    (
                        <h2
                            className='text-neutral-500'
                        >
                        {username}
                    </h2>
                    )}
                </span>
                {isLoadingUserData ? (
                        <div className="w-20 h-20 overflow-hidden 
                            rounded-full bg-neutral-800 animate-pulse" />
                    )
                    :
                    (
                        <div
                            className='relative w-20 h-20 overflow-hidden 
                            rounded-full border'
                            >
                        <Image 
                            src={profileimage}
                            alt=''
                            fill
                            className='object-cover'
                            />
                    </div>
                    )}
            </div>
            <div
                className='py-4 max-w-[80%]'
            >
                {isLoadingUserData ? (
                        <div className="w-54 h-6 overflow-hidden 
                            rounded-md bg-neutral-800 animate-pulse" />
                    )
                    :
                     profilebio !== "" && profilebio ? (
                    <p>
                        {profilebio}
                    </p>
                )
                :
                (
                    <p
                        className='text-neutral-500'
                    >
                        Edit profile and add Bio.
                    </p>
                )}
                <div
                    className='flex items-center gap-2 pt-2'
                >
                    {isLoadingUserData ? (
                        <div className="w-26 h-8 overflow-hidden 
                            rounded-full bg-neutral-800 animate-pulse" />
                    )
                    :
                    interests && interests.length > 0 && interests.map((item, idx) => {
                        return (
                            <button
                                key={idx}
                                className='py-1 px-4 rounded-full border 
                                    hover:bg-neutral-900/50 cursor-pointer
                                    border-neutral-800'
                            >
                                {item}
                            </button>
                        )
                    })}
                    <button
                        onClick={HandleAddInterests}
                        className='py-2 px-4 rounded-full 
                            hover:bg-neutral-900/50 cursor-pointer
                            border border-neutral-800'
                    >
                        <Plus size={14}/>
                    </button>
                </div>
            </div>
            <div
                className='w-full flex items-center justify-between'
            >
                <div
                    className='flex items-center gap-2'
                >
                    <div
                        className='flex items-center -space-x-1'
                    >
                        {treeFollowers?.map((user, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className='relative w-4 h-4 overflow-hidden 
                                        rounded-full border border-neutral-800'
                                >
                                    <Image 
                                        src={user?.profileimage}
                                        alt=''
                                        fill
                                        object-cover
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <h1
                        onClick={() => setShowfollowersMenu(true)}
                        className='text-neutral-500 text-sm hover:underline cursor-pointer'
                    >
                        Followers
                    </h1>
                </div>
                <div
                    className='flex items-center gap-2'
                >
                    <span
                        className='rounded-full hover:bg-neutral-900 
                            cursor-pointer p-2'
                    >
                        <ChartColumnBig 
                            size={24}
                        />
                    </span>
                    <span
                        className='rounded-full hover:bg-neutral-900 
                            cursor-pointer p-2'
                    >
                        <Instagram 
                            size={24}
                            />
                    </span>
                </div>
            </div>
            <div
                className='pt-2'
            >
                <button
                    onClick={() => setIsOpenEditProfile(true)}
                    className='cursor-pointer border border-neutral-800 
                        w-full flex justify-center text-sm font-semibold 
                        py-1.5 rounded-lg'
                >
                    Edit Profile
                </button>
            </div>
        </div>
        <div
            className='sticky top-0 border-y border-neutral-800
                w-full flex items-center justify-between'
        >
            {Profile_Tabs.map((tab, idx) => {
                return (
                    <li
                        key={idx}
                        onClick={() => HandleChangeProfileTab(tab)}
                        className={`list-none w-full flex transition-all duration-200
                            justify-center cursor-pointer py-2
                            ${params?.toLowerCase() === tab.toLowerCase() ? "font-bold text-neutral-100 border-b" : "text-neutral-400"}`}
                    >
                        {tab}
                    </li>
                )
            })}
        </div>
        <div
            className='border-b border-neutral-800'
        >
        <div 
            className="flex w-full
                px-6 py-4 items-center justify-between">
            <div className="flex items-center gap-3">
            <div 
                className="relative w-10 h-10 rounded-full 
                    border-2 overflow-hidden">
                    {profileimage ? (
                    <Image
                        src={profileimage}
                        alt="User Profile"
                        fill
                        className="object-cover"
                    />
                    ) : (
                    <span 
                        className="text-2xl w-full h-full flex 
                        flex-col justify-center 
                        items-center bg-neutral-800">
                        {name && name.charAt(0).toUpperCase() || ""}
                    </span>
                    )}
            </div>
            <p 
                onClick={() => setIsCreatePostOpen(true)}
                className="text-neutral-600 hover:text-neutral-500">
                What&apos;s new ?
            </p>
            </div>
            <button 
                onClick={() => setIsCreatePostOpen(true)}
                className="py-1 px-4 rounded-lg border 
                    hover:bg-neutral-800/50 cursor-pointer 
                    border-neutral-700">
                Post
            </button>
        </div>
        </div>
        <div
            className=''
        >
            {RenderTabs}
        </div>
    </section>
  )
}
