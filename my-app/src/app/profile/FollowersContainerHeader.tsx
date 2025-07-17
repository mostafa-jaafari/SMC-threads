import React from 'react'

const HeaderTabs = ["Follower", "Following"];
export default function FollowersContainerHeader() {
  return (
    <div
        className='w-full flex gap-1'
    >
        {HeaderTabs.map((tab, index) => {
            return (
                <button
                    key={index}
                    className='w-full bg-red-500 flex flex-col 
                        items-center py-4'
                >
                    {tab}
                </button>
            )
        })}
    </div>
  )
}
