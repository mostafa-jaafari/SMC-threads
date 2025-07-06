'use client';

import { db } from "@/Firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import { v4 as uuid4 } from 'uuid';

type CreatePostContextType = {
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (isOpen: boolean) => void;
  HandleCreatePost?: (PostDescription: string, selectedTopic: string) => Promise<void>;
};

const CreatePostContext = createContext<CreatePostContextType | undefined>(undefined);

export function CreatePostProvider({ children }: { children: React.ReactNode }) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const { data: session } = useSession();
  const Current_User_Email = session?.user?.email;

  const Post_UuId = session?.user?.name && session?.user?.name.replace(' ', '-').toLowerCase() + "-" + uuid4();
  const HandleCreatePost = async (PostDescription: string ,selectedTopic :string) => {
    if (!Current_User_Email) return;
    try {
      const DocRef = doc(db, 'users', Current_User_Email);
      await updateDoc(DocRef, {
        posts: arrayUnion({
          uuid: Post_UuId,
          postowner: Current_User_Email,
          whatsnew: PostDescription,
          topic: selectedTopic,
          likesCount: 0,
          createdAt: new Date().toISOString(),
        })
      })
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <CreatePostContext.Provider value={{ isCreatePostOpen, setIsCreatePostOpen, HandleCreatePost }}>
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