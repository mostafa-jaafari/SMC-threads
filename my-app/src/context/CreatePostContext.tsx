'use client';

import { createContext, useContext, useState } from "react";

type CreatePostContextType = {
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (isOpen: boolean) => void;
};

const CreatePostContext = createContext<CreatePostContextType | undefined>(undefined);

export function CreatePostProvider({ children }: { children: React.ReactNode }) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <CreatePostContext.Provider value={{ isCreatePostOpen, setIsCreatePostOpen }}>
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