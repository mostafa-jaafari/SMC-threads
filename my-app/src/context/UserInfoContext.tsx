'use client';

import { db } from "@/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";


interface UserInfoContextProps {
    email: string,
    name: string,
    profileimage: string,
}
const UserInfoContext = createContext<UserInfoContextProps | undefined>(undefined)


export function UserInfoProvider({ children }: { children: React.ReactNode }){
    const session = useSession();
    const [userDetails, setUserDetails] = useState<UserInfoContextProps>({
        email: "",
        name: "",
        profileimage: "",
    });
    useEffect(() => {
        if(!session?.data?.user?.email) return;
        const unsubscribe = onSnapshot(doc(db, 'users', session?.data?.user?.email), (snapshot) => {
            if(snapshot.exists()){
                const data = snapshot.data();
                setUserDetails({
                    email: data?.email,
                    name: data?.name,
                    profileimage: data?.profileimage,
                });
            }
        })
        return () => unsubscribe();
    },[session])

    return (
        <UserInfoContext.Provider value={ userDetails }>
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