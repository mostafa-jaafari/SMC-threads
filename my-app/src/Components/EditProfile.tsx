"use client";

import { useUserInfo } from "@/context/UserInfoContext";
import { AlignJustify, ChevronLeft, ChevronRight, CircleMinus, DiamondPlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { toast } from "sonner";
import { useEditProfile } from "@/context/OpenEditProfileContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase";
import { useSession } from "next-auth/react";


interface inputsEditTypes{
    Name: string;
    Bio: string;
    Interests: string[];
    isPrivateAccount: boolean;
}
interface FirestoreUserData {
  name: string;
  bio: string;
  interests: string[];
  isPrivateAccount: boolean;
}
export function EditProfile(){
    const session = useSession();
    const CurrentUser_Email = session?.data?.user?.email;
    const { isOpenEditProfile, setIsOpenEditProfile, setTabName, tabName } = useEditProfile();
    const EditProfileHeaderRef = useRef<HTMLDivElement | null>(null);
    const EditProfileRef = useRef<HTMLDivElement | null>(null);
    const { name, profileimage, profilebio, interests, isPrivateProfile } = useUserInfo();
    useEffect(() => {
        const HideEditProfile = (e: MouseEvent) => {
            const isOutsideContent = EditProfileHeaderRef.current && !EditProfileHeaderRef.current.contains(e.target as Node);
            const isOutsideHeader = EditProfileRef.current && !EditProfileRef.current.contains(e.target as Node);
            if(isOutsideContent && isOutsideHeader){
                setIsOpenEditProfile(false);
            }
        }
        document.addEventListener("mousedown", HideEditProfile);
        return () => removeEventListener("mousedown", HideEditProfile);
    },[isPrivateProfile, interests, name, profilebio, setIsOpenEditProfile])
    
    useEffect(() => {
        if (isOpenEditProfile) {
            setInputsEdit({
            Name: name,
            Bio: profilebio || "",
            Interests: interests || [],
            isPrivateAccount: isPrivateProfile || false,
            });
            setInterestsInput("");
            setTabName("");
        }
    }, [isOpenEditProfile, name, profilebio, interests, setTabName, isPrivateProfile]);

    
    const [inputsEdit, setInputsEdit] = useState<inputsEditTypes>({
        Name: "",
        Bio: "",
        Interests: [],
        isPrivateAccount: false,
    });

    useEffect(() => {
    if (name || profileimage || profilebio || interests) {
        setInputsEdit(({ 
            Name: name,
            Bio: profilebio || "",
            Interests: interests || [],
            isPrivateAccount: isPrivateProfile || false,
        }));
    }
    }, [name, profileimage, profilebio, interests, isPrivateProfile]);

    const HandleChangePrivateProfile = () => {
        toast.success("Profile privacy setting changed!")
    }

    const [animateTab, setAnimateTab] = useState(false);
    const [showTab, setShowTab] = useState(false);
    useEffect(() => {
        if (tabName === "interests") {
            setShowTab(true);
            setTimeout(() => setAnimateTab(true), 10);
        } else if (showTab) {
            setAnimateTab(false);
            const timeout = setTimeout(() => setShowTab(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [tabName, showTab]);


    
    const [interestsInput, setInterestsInput] = useState('');

    const HandlePushInterests = () => {
        const value = interestsInput.trim();
        if (value && !inputsEdit.Interests.includes(value)) {
            setInputsEdit({
            ...inputsEdit,
            Interests: [...inputsEdit.Interests, value],
            });
            setInterestsInput(""); // إعادة تعيين القيمة
        }
    };
    const HandleRemoveInterest = (InterestIndex : number) => {
        const FiltredInterests = inputsEdit.Interests.filter((_, idx) => idx !== InterestIndex);
        setInputsEdit({...inputsEdit, Interests: FiltredInterests})
    }
    
    const [isSaveInterestsLoading, setIsSaveInterestsLoading] = useState<boolean>(false);
    function arraysEqual(a: string[], b: string[]) {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((val, idx) => val === sortedB[idx]);
    }
    const HandleSaveInterests = async () => {
        if(!CurrentUser_Email) return;
        try{
            setIsSaveInterestsLoading(true);
            const DocRef = doc(db, "users", CurrentUser_Email);
            if (arraysEqual(inputsEdit.Interests, interests || [])) {
                setIsSaveInterestsLoading(false);
                toast.info("Nothing to update your interests are unchanged.");
                return;
            }
            await updateDoc(DocRef, {
                interests: inputsEdit.Interests,
            })
            setIsSaveInterestsLoading(false);
            toast.success("Interests updated successfully!")
        }catch(err){
            console.log(err);
        }
    }

    const HandleUpdateProfile = async () => {
        if (!CurrentUser_Email) return;

        const DocRef = doc(db, "users", CurrentUser_Email);

        const updates: Partial<FirestoreUserData> = {};
        if (inputsEdit.Name !== name) updates.name = inputsEdit.Name;
        if (inputsEdit.Bio !== profilebio) updates.bio = inputsEdit.Bio;
        if (inputsEdit.isPrivateAccount !== isPrivateProfile)
            updates.isPrivateAccount = inputsEdit.isPrivateAccount;

        if (Object.keys(updates).length === 0) {
            toast.info("No changes to update.");
            return;
        }

        try {
            await updateDoc(DocRef, updates);
            toast.success("Profile updated!");
        } catch (err) {
            console.error(err);
            toast.error("Update failed!");
        }
    };

    if(!isOpenEditProfile) return null;


    let EditProfileTabs;
    switch (tabName) {
        case "interests":
            EditProfileTabs = (
                <div
                    className={`transform transition-all duration-300 ease-in-out
                        ${animateTab ? "w-full opacity-100 translate-y-0" : "w-0 opacity-0 translate-y-10"}
                    `}
                >
                    <div
                        className="border-b border-neutral-800 pb-4 w-full 
                            flex items-center justify-between"
                    >
                        <span
                            onClick={() => setTabName('')}
                            className="cursor-pointer hover:text-neutral-400"
                        >
                            <ChevronLeft />
                        </span>
                        <h2
                            className="font-bold flex justify-center"
                        >
                            {tabName}
                        </h2>
                        <button
                            disabled={isSaveInterestsLoading}
                            onClick={HandleSaveInterests}
                            className="text-neutral-300 font-bold
                            cursor-pointer hover:text-neutral-100"
                        >
                            {isSaveInterestsLoading ? (
                                <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin">
                                </div>
                            ) : "Done"}
                        </button>
                    </div>
                    <div
                        className="space-y-4 pt-4"
                    >
                        <div
                            className="px-2 border border-neutral-800 rounded-xl flex items-center"
                        >
                            <input 
                                className="w-full pr-2 py-2 
                                    outline-none"
                                type="text"
                                placeholder="Add interests"
                                value={interestsInput}
                                onChange={(e) => setInterestsInput(e.target.value)}
                            />
                            <button
                                onClick={HandlePushInterests}
                                className="cursor-pointer"
                            >
                                <DiamondPlus />
                            </button>
                        </div>
                        <div
                            className="w-full rounded-xl border border-neutral-800"
                        >
                            {inputsEdit.Interests.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={`flex items-center justify-between 
                                            text-neutral-500 py-2 px-2 border-neutral-800
                                            ${idx !== inputsEdit.Interests.length -1 ? "border-b" : ""}`}
                                    >
                                        <div
                                            className="flex items-center gap-2"
                                        >
                                            <AlignJustify
                                                size={14} 
                                            />
                                            <span
                                            >
                                                {item}
                                            </span>
                                        </div>
                                        <CircleMinus 
                                            onClick={() => HandleRemoveInterest(idx)}
                                            size={14}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
            break;
        default:
            EditProfileTabs = (
                <section
                    className="space-y-4"
                >
                    <div
                        className="flex items-end gap-4"
                    >
                        <div
                            className="w-full border-b border-neutral-800
                                flex flex-col pb-4"
                        >
                            <label 
                                htmlFor="Name"
                                className="cursor-pointer 
                                    hover:text-neutral-300 font-bold"
                                >
                                    Name
                            </label>
                            <div className="flex items-center py-1">
                                <span className="text-neutral-500">@</span>
                                <input 
                                    type="text" 
                                    id="Name" 
                                    value={inputsEdit.Name}
                                    onChange={(e) => setInputsEdit({ ...inputsEdit, Name: e.target.value })}
                                    className="grow text-neutral-300 border-none 
                                        outline-none bg-transparent px-1"
                                />
                            </div>
                        </div>
                        <div
                            className="relative flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border"
                        >
                            <Image 
                                src={profileimage}
                                alt=""
                                fill
                                className="object-cover"
                                defaultValue={name}
                            />
                        </div>
                    </div>
                    <div
                        className="w-full border-b border-neutral-800
                            flex flex-col pb-4"
                    >
                        <label 
                            htmlFor="Bio"
                            className="font-bold"
                        >
                            Bio
                        </label>
                        <textarea 
                            name="" 
                            id="Bio"
                            maxLength={250}
                            minLength={5}
                            className="text-neutral-300 text-sm"
                            value={inputsEdit.Bio}
                            onChange={(e) => setInputsEdit({...inputsEdit, Bio: e.target.value})}
                        ></textarea>
                    </div>
                    <div
                        onClick={() => setTabName('interests')}
                        className="w-full border-b border-neutral-800 
                            flex items-center justify-between pb-4
                            group cursor-pointer"
                    >
                        <div>
                            <label 
                                htmlFor="Interests"
                                className="font-bold"
                            >
                                Interests
                            </label>
                            <div
                                className="w-full flex"
                            >
                                {inputsEdit.Interests.map((item, idx) => {
                                    return (
                                        <button
                                            key={idx}
                                            className="text-neutral-300 cursor-pointer"
                                        >
                                            {item}
                                            {inputsEdit.Interests.length > 0 && idx !== inputsEdit.Interests.length - 1 ? "," : ""}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                            <ChevronRight 
                            size={20}
                                className="group-hover:text-neutral-500"
                            />
                    </div>
                    {/* ------- Links ------- */}
                    <div
                        className="w-full border-b border-neutral-800 pb-4
                            flex items-center cursor-pointer justify-between"
                    >
                        <h1
                            className="font-bold"
                        >
                            Links
                        </h1>
                        <ChevronRight size={20}/>
                    </div>
                    <div
                        className="flex gap-4 items-center justify-between"
                    >
                        <span>
                            <h1
                                className="font-bold"
                            >
                                Private Profile
                            </h1>
                            <p
                                className="text-neutral-500 text-xs text-wrap"
                            >
                                If you switch to private, you won&apos;t be able to reply to others unless they follow you.
                            </p>
                        </span>
                        <ToggleButton 
                            isActive={inputsEdit.isPrivateAccount}
                            onclick={HandleChangePrivateProfile}
                            setIsActive={(newVal) =>
                                setInputsEdit({ ...inputsEdit, isPrivateAccount: newVal })
                            }
                        />
                    </div>
                    <div
                        className="w-full hidden md:flex lg:flex"
                    >
                        <button
                            onClick={HandleUpdateProfile}
                            className="w-full text-black font-bold 
                                hover:bg-neutral-300 bg-neutral-200 py-3
                                cursor-pointer rounded-xl flex justify-center"
                        >
                            Done
                        </button>
                    </div>
                </section>
            )
            break;
    }
    return (
        <section
            className="absolute left-0 top-0 bg-black/50 
                z-50 w-full h-screen flex flex-col items-center justify-start"
        >
            <div
                ref={EditProfileHeaderRef}
                className="lg:hidden md:hidden w-full py-4 bg-[#101010] 
                    flex items-center justify-between px-6
                    border-b border-neutral-800"
            >
                <button
                    onClick={() => setIsOpenEditProfile(false)}
                    className="text-neutral-400 
                        hover:text-neutral-200 cursor-pointer"
                >
                    Cancel
                </button>
                <h1 
                    className="font-bold"
                >
                    Edit profile
                </h1>
                <button
                    onClick={HandleUpdateProfile}
                    className="text-neutral-400 font-bold 
                        cursor-pointer hover:text-neutral-100"
                >
                    Done
                </button>
            </div>
            <div
                className="px-4 pt-10"
            >
                <div
                    ref={EditProfileRef}
                    className="max-w-[600px] min-w-[400px]
                        grow rounded-3xl border border-neutral-800 
                        bg-[#101010] p-6 space-y-4"
                >
                    {EditProfileTabs}
                </div>
            </div>
            </section>
    )
}