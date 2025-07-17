"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";


interface OpenEditProfileContextTypes {
    setIsOpenEditProfile: (isOpen: boolean) => void;
    isOpenEditProfile: boolean;
    setTabName: (T: string) => void;
    tabName: string;
    currentFTab: string;
    setCurrentFTab: (tab: string) => void;
}
const OpenEditProfileContext = createContext<OpenEditProfileContextTypes | undefined>(undefined);


export function OpenEditProfileProvider({ children }: { children: ReactNode }){
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const [tabName, setTabName] = useState('');
    const [currentFTab, setCurrentFTab] = useState<string>("followers");
    return (
        <OpenEditProfileContext.Provider value={{ setIsOpenEditProfile, isOpenEditProfile, setTabName, tabName, currentFTab, setCurrentFTab }}>
            {children}
        </OpenEditProfileContext.Provider>
    )
}


export function useEditProfile(){
    const Context = useContext(OpenEditProfileContext);
    if(!Context){
        throw new Error("useEditProfile must be used within a OpenEditProfileProvider")
    }
    return Context;
}