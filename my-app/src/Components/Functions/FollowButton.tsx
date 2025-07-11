import { db } from "@/Firebase";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export async function FollowButton(targetEmail: string, currentUserEmail: string) {
  try {
    const currentUserRef = doc(db, "users", currentUserEmail);
    const currentUserSnap = await getDoc(currentUserRef);

    if (!currentUserSnap.exists()) {
      toast.error("User document does not exist, Please login!");
      return;
    }

    const currentData = currentUserSnap.data();
    const isFollowing = currentData.following?.includes(targetEmail);
    await updateDoc(currentUserRef, {
      following: isFollowing
        ? arrayRemove(targetEmail)
        : arrayUnion(targetEmail),
    });
    await updateDoc(doc(db, 'users', targetEmail), {
      followers: isFollowing
        ? arrayRemove(currentUserEmail)
        : arrayUnion(currentUserEmail),
    });

    toast.success(isFollowing ? "Unfollowed successfully." : "Followed successfully.");
  } catch (err) {
    console.error("Follow error:", err);
    toast.error("Something went wrong.");
  }
}
