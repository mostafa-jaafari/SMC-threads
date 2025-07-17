import React from 'react'
import FollowersContainerHeader from './FollowersContainerHeader'

export default function FollowersContainer() {
  return (
    <section
        className="fixed left-0 top-0 bg-black/50 
                z-50 w-full h-screen flex flex-col 
                items-center justify-start"
    >
        <div
            className="lg:w-1/2 rounded-3xl bg-[#101010]
                border border-neutral-800 overflow-hidden"
        >
          <FollowersContainerHeader />
            FollowersContainer
        </div>
    </section>
  )
}
