"use client";
import React, { useEffect, useState } from 'react'
import FollowersContainerHeader from './FollowersContainerHeader'
import { useEditProfile } from '@/context/OpenEditProfileContext';
import { useUserInfo } from '@/context/UserInfoContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/Firebase';
import Image from 'next/image';


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
  const { currentFTab } = useEditProfile();
  const { Following, Followers } = useUserInfo();

  const CurrentTabSelected = currentFTab === "following" ? Following : Followers;
  const [usersData, setUsersData] = useState<userDataTypes[] | []>([]);
  const [isUsersDataLoading, setIsUsersDataLoading] = useState<boolean>(true)
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
    })
    return () => unsubscribe();
  },[currentFTab, CurrentTabSelected])
  if(isUsersDataLoading) return <div>Loading...</div>
  return (
    <section
          className="fixed left-0 top-0 bg-black/50 
            z-50 w-full h-screen flex flex-col 
            items-center justify-start pt-14"
        >
            <div
                className="lg:w-1/2 rounded-3xl bg-[#101010]
                  border border-neutral-800 overflow-hidden"
            >
              <FollowersContainerHeader
                FollowersLength={Followers?.length}
                FollowingLength={Following?.length}
              />
                {usersData.length > 0 && usersData.map((user) => {
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
                        className='w-full py-4 pr-6 flex items-center justify-between
                          border-b border-neutral-800'
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
                          className='border py-1 px-4 rounded-xl text-neutral-700'
                        >
                          {currentFTab === "followers" ? "Follow Back" : "Following"}
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>
    </section>
  )
}
