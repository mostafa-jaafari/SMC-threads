"use client"
import PostCard from '@/Components/PostCard';
import { Post } from '@/Components/PostsContainer';
import PostSkeleton from '@/Components/PostSkeleton';
import { db } from '@/Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function ThreadsPage() {

    const session = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[] | []>([]);
    useEffect(() => {
        setIsLoading(true);
        const DocRef = doc(db, "global", "posts");
        const unsubscribe = onSnapshot(DocRef, (snapshot) => {
            const Data = snapshot.data();
            const CurrentUser_Posts = Data?.posts.filter((post: Post) => post.postowner === session?.data?.user?.email);
            setPosts(CurrentUser_Posts || []);
            setIsLoading(false)
        })
        return () => unsubscribe();
    },[session])
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
