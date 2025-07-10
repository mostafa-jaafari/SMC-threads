'use client';

import { db } from "@/Firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { v4 as uuid4 } from 'uuid';

type CreatePostContextType = {
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (isOpen: boolean) => void;
  HandleCreatePost?: (PostDescription: string, selectedTopic: string, selectedFile:File | null, postvisibility: string) => Promise<void>;
  isLoadingCreatePost?: boolean;
  setIsFinishCreatingPost?: (isFinish: boolean) => void;
  isFinishCreatingPost?: boolean;
};

const CreatePostContext = createContext<CreatePostContextType | undefined>(undefined);

export function CreatePostProvider({ children }: { children: React.ReactNode }) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isLoadingCreatePost, setIsLoadingCreatePost] = useState<boolean>(false);
  const [isFinishCreatingPost, setIsFinishCreatingPost] = useState(false)
  
  const { data: session } = useSession();
  const Current_User_Email = session?.user?.email;

  const Post_UuId = session?.user?.name && session?.user?.name.replace(' ', '-').toLowerCase() + "-" + uuid4();
  const HandleCreatePost = async (PostDescription: string ,selectedTopic :string, selectedFile:File | null, postvisibility: string) => {
    if (!Current_User_Email) return;
    try {
      setIsLoadingCreatePost(true);
      if(selectedFile === null) {
        setIsLoadingCreatePost(false);
        setIsFinishCreatingPost(true);
        alert('File Not Selected');
        return;
      }
      const Form_Data = new FormData();
      Form_Data.append("file", selectedFile);
      Form_Data.append('upload_preset', 'ml_default');
      const res = await fetch("https://api.cloudinary.com/v1_1/dzih5telw/image/upload", {
        method: "POST",
        body: Form_Data,
      });
      const data = await res.json();
      const Imgae_Url = data.secure_url;
      const DocRef = doc(db, 'users', Current_User_Email);
      const AllPostsRef = doc(db, 'global', "posts");
      await updateDoc(DocRef, {
        posts: arrayUnion({
          uuid: Post_UuId,
          postowner: Current_User_Email,
          whatsnew: PostDescription || "",
          topic: selectedTopic || "",
          likesCount: 0,
          createdAt: new Date().toISOString(),
          imagepost: Imgae_Url || "",
          visibility: postvisibility || "",
        })
      })
      setIsLoadingCreatePost(false);
      setIsFinishCreatingPost(true);
      await updateDoc(AllPostsRef, {
        posts: arrayUnion({
          uuid: Post_UuId,
          postowner: Current_User_Email,
          whatsnew: PostDescription || "",
          topic: selectedTopic || "",
          likesCount: 0,
          createdAt: new Date().toISOString(),
          imagepost: Imgae_Url || "",
          visibility: postvisibility || "",
          UserInfo: {
            name: session?.user?.name,
            profileimage: session?.user?.image,
          }
        })
      })
      toast.success(<span>Post created successfuly <Link className="underline" href={`/${Post_UuId}`}>View</Link></span>)
    } catch (error) {
      alert(error);
      setIsLoadingCreatePost(false);
      setIsFinishCreatingPost(true);
    }
  };
  return (
    <CreatePostContext.Provider value={{ isCreatePostOpen, setIsCreatePostOpen, HandleCreatePost, isLoadingCreatePost, setIsFinishCreatingPost, isFinishCreatingPost }}>
        {children}
    </CreatePostContext.Provider>
  );
}

export const useCreatePost = () => {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error("useCreatePost must be used within a CreatePostProvider");
  }
  return context;
}