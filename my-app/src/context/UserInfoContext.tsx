'use client';

import { db } from "@/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";


interface UserInfoContextProps {
    email: string,
    name: string,
    profileimage: string,
    profilebio?: string;
    interests?: string[];
    isPrivateProfile?: boolean;
    Links: {
            label: string,
            link: string,
        }[];
    Following: string[];
    Followers: string[];
    isLoadingUserData: boolean;
}
const UserInfoContext = createContext<UserInfoContextProps | undefined>(undefined)


export function UserInfoProvider({ children }: { children: React.ReactNode }){
    const session = useSession();
    const [userDetails, setUserDetails] = useState<Omit<UserInfoContextProps, "isLoadingUserData">>({
        email: "",
        name: "",
        profileimage: "",
        profilebio: "",
        interests: [],
        isPrivateProfile: false,
        Links: [],
        Following: [],
        Followers: [],
    });
    const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(true);
    useEffect(() => {
        if(!session?.data?.user?.email) {
            setIsLoadingUserData(false);
            return
        };
        const unsubscribe = onSnapshot(doc(db, 'users', session?.data?.user?.email), (snapshot) => {
            if(snapshot.exists()){
                const data = snapshot.data();
                setUserDetails({
                    email: data?.email,
                    name: data?.name,
                    profileimage: data?.profileimage,
                    profilebio: data?.profilebio,
                    interests: data?.interests,
                    isPrivateProfile: data?.isPrivateProfile,
                    Links: data?.Links,
                    Following: data?.following,
                    Followers: data?.followers,
                });
            }
            setIsLoadingUserData(false);
        })
        return () => unsubscribe();
    },[session])

    return (
        <UserInfoContext.Provider value={{...userDetails, isLoadingUserData }}>
            {children}
        </UserInfoContext.Provider>
    )
}


export function useUserInfo(){
    const Context = useContext(UserInfoContext);
    if(!Context){
        throw new Error("useUserInfo must be used within a UserInfoProvider");
    }
    return Context;
}