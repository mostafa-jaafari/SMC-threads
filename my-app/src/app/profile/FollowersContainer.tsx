"use client";
import React, { useEffect, useRef, useState } from 'react'
import FollowersContainerHeader from './FollowersContainerHeader'
import { useEditProfile } from '@/context/OpenEditProfileContext';
import { useUserInfo } from '@/context/UserInfoContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/Firebase';
import Image from 'next/image';
import { FollowButton } from '@/Components/Functions/FollowButton';


export interface userDataTypes {
  email: string;
  id: string;
  followers: string[];
  following: string[];
  name: string;
  profileimage: string;
  profilebio: string;
  isPrivateAccount: boolean;
  Links: {
    label: string;
    link: string;
  }[];
  interests: string[];
}
export default function FollowersContainer() {
  const { currentFTab, setShowfollowersMenu, showfollowersMenu, setTreeFollowers } = useEditProfile();
  const { Following, Followers, email } = useUserInfo();
  const FollowersContainerRef = useRef<HTMLDivElement | null>(null);
  const CurrentTabSelected = currentFTab === "following" ? Following : Followers;
  const [usersData, setUsersData] = useState<userDataTypes[] | []>([]);
  const [isUsersDataLoading, setIsUsersDataLoading] = useState<boolean>(true)
  // const [isFollowing, setIsFollowing] = useState(true);
  useEffect(() => {
    const HideFollowersContainer = (e: MouseEvent) => {
      if(FollowersContainerRef.current && !FollowersContainerRef.current.contains(e.target as Node)){
        setShowfollowersMenu(false);
      }
    }
    document.addEventListener("mousedown", HideFollowersContainer);
    return () =>  document.removeEventListener("mousedown", HideFollowersContainer);
  },[setShowfollowersMenu])
  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const followedUsers = snapshot.docs
      .filter(doc => CurrentTabSelected?.includes(doc.id))
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsersData(followedUsers as userDataTypes[])
      setIsUsersDataLoading(false);
      const TreeUsers = usersData.slice(0, 3);
      setTreeFollowers(TreeUsers);
    })
    return () => unsubscribe();
  },[currentFTab, CurrentTabSelected, Following, setTreeFollowers, usersData])
  if(isUsersDataLoading) return <div>Loading...</div>
  if(showfollowersMenu) return (
    <section
          className="fixed left-0 top-0 bg-black/50 
            z-50 w-full h-screen flex flex-col 
            items-center justify-start pt-14"
        >
            <div
              ref={FollowersContainerRef}
                className="lg:w-1/2 md:w-[70%] sm:w-[80%] w-[90%] rounded-3xl bg-[#101010]
                  border border-neutral-800 overflow-hidden"
            >
              <FollowersContainerHeader
                FollowersLength={Followers?.length}
                FollowingLength={Following?.length}
              />
                {usersData.length > 0 ? usersData.map((user, idx) => {
                  const followedByBoth = Following.includes(user?.email) && Followers.includes(user?.email);
                  return (
                    <div
                      key={user?.email}
                      className='w-full flex items-center gap-4 pl-6 mb-2'
                    >
                      <div
                        className='relative flex-shrink-0 w-12 h-12 rounded-full border 
                          overflow-hidden'
                      >
                        <Image 
                          src={user?.profileimage}
                          alt='profile image'
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div
                        className={`w-full py-4 pr-6 flex items-center justify-between
                          border-neutral-800
                          ${idx !== CurrentTabSelected.length - 1 && "border-b"}`}
                      >
                        <span>
                          <h1
                            className=''
                          >
                            {user?.name}
                          </h1>
                          <p
                            className='text-neutral-500'
                          >
                            username
                          </p>
                        </span>
                        <button
                          onClick={async () => {
                            const currentUserEmail = email;
                            if (!currentUserEmail) return;
                            await FollowButton(user?.email, currentUserEmail);
                            }}
                          className={`border py-2 px-4 rounded-xl 
                            text-neutral-700 text-sm cursor-pointer
                            ${!followedByBoth && currentFTab === "followers" ? "bg-white hover:bg-neutral-300 text-neutral-900 font-bold text-sm" : "hover:text-neutral-600"}`}
                        >
                          {!followedByBoth && currentFTab === "followers" ? "Back Follow" : currentFTab === "followers" ? "Following" : "Following"}
                        </button>
                      </div>
                    </div>
                  )
                }) : (
                  <div
                    className='w-full min-h-20 flex flex-col 
                      justify-center items-center text-neutral-500'
                  >
                    no {currentFTab} yet!
                  </div>
                )}
            </div>
    </section>
  )
}
