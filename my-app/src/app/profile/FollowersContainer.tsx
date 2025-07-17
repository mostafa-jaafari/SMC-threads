"use client";
import React, { useEffect } from 'react'
import FollowersContainerHeader from './FollowersContainerHeader'
import { useEditProfile } from '@/context/OpenEditProfileContext';
import { useUserInfo } from '@/context/UserInfoContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/Firebase';

export default function FollowersContainer() {
  const { currentFTab } = useEditProfile();
  const { Following, email, Followers } = useUserInfo();

  const CurrentTabSelected = currentFTab === "following" ? Following : Followers;
  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) =)
    const followedUsers = snapshot.docs
    .filter(doc => followingArray.includes(doc.id))
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },[currentFTab])
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
          <FollowersContainerHeader />
            <div
              className='w-full flex items-center gap-4 pl-6 mb-2'
            >
              <div
                className='relative flex-shrink-0 w-12 h-12 rounded-full border 
                  overflow-hidden'
              >
                {/* Image */}
              </div>
              <div
                className='w-full py-4 pr-6 flex items-center justify-between
                  border-b border-neutral-800'
              >
                <span>
                  <h1
                    className=''
                  >
                    Mostafa Jaafari
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
                  Follow
                </button>
              </div>
            </div>
        </div>
    </section>
  )
}
