import { db } from "@/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";



export interface PostTypes {
    uuid: string;
    postowner: string;
}
export async function LikeToggleBtn(
    currentUser: string,
    PostOwner: string,
    Postuuid: string,
): Promise<{ likesCount: number; isLiked: boolean } | null> {
    if (!currentUser) return null;
    
    try {
        const docRef = doc(db, 'global', 'posts');
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) return null;
        
        const posts = docSnap.data()?.posts || [];
        const postIndex = posts.findIndex((p: PostTypes) => p?.postowner === PostOwner && p?.uuid === Postuuid);
        
        if (postIndex === -1) return null;
        
        const post = posts[postIndex];
        const likes = post.likes || [];
        const isLiked = likes.includes(currentUser);
        
        // Toggle like
        const updatedLikes = isLiked 
            ? likes.filter((user: string) => user !== currentUser)
            : [...likes, currentUser];
        
        // Update post
        posts[postIndex] = { ...post, likes: updatedLikes };
        
        await updateDoc(docRef, { posts });
                
        return {
            likesCount: updatedLikes.length,
            isLiked: !isLiked
        };
        
    } catch (error) {
        console.error("Like toggle error:", error);
        return null;
    }
}