import { db } from "@/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export async function LikeToggleBtn(
    currentUser: string,
    PostOwner: string,
    Postuuid: string,
): Promise<{ likesCount: number; isLiked: boolean } | null> {
    if (!currentUser) return null;
    
    try {
        const DocRef = doc(db, 'global', 'posts');
        const DocSnap = await getDoc(DocRef);
        
        if (!DocSnap.exists()) {
            console.error("Posts document does not exist");
            return null;
        }
        
        const DocData = DocSnap.data();
        const Posts = DocData?.posts || [];
        
        // Find the specific post
        const postIndex = Posts.findIndex((post) => 
            post?.postowner === PostOwner && post?.uuid === Postuuid
        );
        
        if (postIndex === -1) {
            console.error("Post not found");
            return null;
        }
        
        const targetPost = Posts[postIndex];
        const currentLikes = targetPost.likes || [];
        const isLiked = currentLikes.includes(currentUser);
        
        // Update the likes array
        let updatedLikes;
        if (isLiked) {
            // Remove like
            updatedLikes = currentLikes.filter(user => user !== currentUser);
        } else {
            // Add like
            updatedLikes = [...currentLikes, currentUser];
        }
        
        // Update the post in the array
        Posts[postIndex] = {
            ...targetPost,
            likes: updatedLikes
        };
        
        // Update the document
        await updateDoc(DocRef, {
            posts: Posts
        });
        
        toast.success(isLiked ? "Unliked" : "Liked");
        
        return {
            likesCount: updatedLikes.length,
            isLiked: !isLiked
        };
        
    } catch (error) {
        console.error("LikeToggleBtn error:", error);
        toast.error("Failed to toggle like");
        return null;
    }
}