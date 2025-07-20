"use client"
import PostCard from '@/Components/PostCard';
import { Post } from '@/Components/PostsContainer';
import PostSkeleton from '@/Components/PostSkeleton';
import { UserInfoContextProps } from '@/context/UserInfoContext';
import { db } from '@/Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ThreadsPage({ UserDetails }: { UserDetails?: UserInfoContextProps | null; }) {

    const session = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[] | []>([]);
    const params = useParams().profileid;
    const Tab = params === UserDetails?.username ? UserDetails?.email : session?.data?.user?.email;
    useEffect(() => {
        setIsLoading(true);
        const DocRef = doc(db, "global", "posts");
        const unsubscribe = onSnapshot(DocRef, (snapshot) => {
            const Data = snapshot.data();
            const CurrentUser_Posts = Data?.posts.filter((post: Post) => post.postowner === Tab);
            setPosts(CurrentUser_Posts || []);
            setIsLoading(false)
        })
        return () => unsubscribe();
    },[session, Tab])
    if(isLoading) return <PostSkeleton />
    return (
        <div
            className='pb-16'
        >
            {posts.map((post) => {
                return (
                    <PostCard 
                        PostOwner={post.postowner}
                        Postuuid={post.uuid}
                        createdAt={post.createdAt}
                        imagepost={post.imagepost}
                        whatsnew={post.whatsnew}
                        key={post.uuid}
                    />
                )
            })}
        </div>
    )
}
