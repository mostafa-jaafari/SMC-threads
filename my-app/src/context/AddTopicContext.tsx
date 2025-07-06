'use client';
import { createContext, useContext, useState } from "react";


type AddTopicContextType = {
    openTopicMenu?: boolean;
    setOpenTopicMenu?: (isOpen: boolean) => void;
    setSelectedTopic?: (Topic: string) => void;
    selectedTopic?: string;
}
const AddTopicContext = createContext<AddTopicContextType | undefined>(undefined);

export function AddTopicProvider({ children }: { children: React.ReactNode }) {
    const [openTopicMenu, setOpenTopicMenu] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState("");
    return (
        <AddTopicContext.Provider value={{setOpenTopicMenu, openTopicMenu, setSelectedTopic, selectedTopic}}>
            {children}
        </AddTopicContext.Provider>
    )
}


export function useAddTopic() {
    const Context = useContext(AddTopicContext);
    if (!Context) {
        throw new Error("useAddTopic must be used within an AddTopicProvider");
    }
    return Context;
} 