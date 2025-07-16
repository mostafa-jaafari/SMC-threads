"use client";

import { useUserInfo } from "@/context/UserInfoContext";
import { AlignJustify, ChevronLeft, ChevronRight, CircleMinus, DiamondPlus, Link2, Pen } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
    Links: {
            label: string,
            link: string,
        }[];
    isPrivateAccount: boolean;
}
interface FirestoreUserData {
  name: string;
  profilebio: string;
  interests: string[];
  isPrivateProfile: boolean;
  profileimage: string;
}
export function EditProfile(){
    const session = useSession();
    const CurrentUser_Email = session?.data?.user?.email;
    const { isOpenEditProfile, setIsOpenEditProfile, setTabName, tabName } = useEditProfile();
    const EditProfileHeaderRef = useRef<HTMLDivElement | null>(null);
    const EditProfileRef = useRef<HTMLDivElement | null>(null);
    const { name, profileimage, profilebio, interests, isPrivateProfile, Links } = useUserInfo();
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
    const HandleChangeUpdateProfile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        setSelectedFile(file);
        const filePreviewURL = URL.createObjectURL(file);
        setProfileImagePreview(filePreviewURL as string);
    }

    useEffect(() => {
        const HideEditProfile = (e: MouseEvent) => {
            const isOutsideContent = EditProfileHeaderRef.current && !EditProfileHeaderRef.current.contains(e.target as Node);
            const isOutsideHeader = EditProfileRef.current && !EditProfileRef.current.contains(e.target as Node);
            if(isOutsideContent && isOutsideHeader){
                setIsOpenEditProfile(false);
                if(profileImagePreview) {
                    URL.revokeObjectURL(profileImagePreview);
                    setProfileImagePreview(null);
                }
            }
        }
        document.addEventListener("mousedown", HideEditProfile);
        return () => document.removeEventListener("mousedown", HideEditProfile);
    },[isPrivateProfile, interests, name, profilebio, setIsOpenEditProfile, profileImagePreview])
    
    
    const [inputsEdit, setInputsEdit] = useState<inputsEditTypes>({
        Name: "",
        Bio: "",
        Interests: [],
        isPrivateAccount: false,
        Links: [],
    });
    useEffect(() => {
        if (isOpenEditProfile) {
            setInputsEdit({
                Name: name,
                Bio: profilebio || "",
                Interests: interests || [],
                isPrivateAccount: isPrivateProfile || false,
                Links: Links || [],
            });
            setInterestsInput("");
            setTabName("");
        }
    }, [isOpenEditProfile, name, profilebio, interests, setTabName, isPrivateProfile, Links, profileimage]);

    

    useEffect(() => {
    if (name || profileimage || profilebio || interests) {
        setInputsEdit(({ 
            Name: name,
            Bio: profilebio || "",
            Interests: interests || [],
            isPrivateAccount: isPrivateProfile || false,
            Links: Links || [],
        }));
    }
    }, [name, profileimage, profilebio, interests, isPrivateProfile, Links]);

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
    const HandleRemoveLink = (LinkIndex: number) => {
        const FiltredLinks = inputsEdit.Links.filter((_, idx) => idx !== LinkIndex);
        setInputsEdit({...inputsEdit, Links: FiltredLinks})
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

    const [isSaveLinksLoading, setIsSaveLinksLoading] = useState(false);
    const HandleSaveLinks = async () => {
        if(!CurrentUser_Email) return;
        try{
            setIsSaveLinksLoading(true);
            const DocRef = doc(db, "users", CurrentUser_Email);
            const HasChanged = JSON.stringify(inputsEdit.Links) !== JSON.stringify(Links);
            if (!HasChanged) {
                toast.info("Nothing to update your Links are unchanged.");
                setIsSaveLinksLoading(false);
                return;
            }
            await updateDoc(DocRef, {
                Links: inputsEdit.Links,
            })
            setIsSaveLinksLoading(false);
            toast.success("Links updated successfully!")
        }catch(err){
            console.log(err);
        }
    }
    const [linksInput, setLinksInput] = useState({
        label: "",
        link: "",
    });
    const HandlePushLinks = () => {
        const label = linksInput.label.trim();
        const link = linksInput.link.trim();

        if (
            label &&
            link &&
            !inputsEdit.Links.some((item) => item.link === link)
        ) {
            setInputsEdit({
            ...inputsEdit,
            Links: [
                ...inputsEdit.Links,
                { label, link }
            ],
            });

            setLinksInput({ label: "", link: "" }); // إعادة تعيين المدخلات
        }
    };


    const HandleUpdateProfile = async () => {
    if (!CurrentUser_Email) return;

    const DocRef = doc(db, "users", CurrentUser_Email);

    const updates: Partial<FirestoreUserData> = {};

    // Only update if name is not empty and has changed
    if (inputsEdit.Name.trim() && inputsEdit.Name !== name) {
        updates.name = inputsEdit.Name.trim();
    }

    // Only update if bio is not empty and has changed
    if (inputsEdit.Bio.trim() && inputsEdit.Bio !== profilebio) {
        updates.profilebio = inputsEdit.Bio.trim();
    }
    
    // For boolean field (can be false), just check if it changed
    if (
        typeof inputsEdit.isPrivateAccount === "boolean" &&
        inputsEdit.isPrivateAccount !== isPrivateProfile
    ) {
        updates.isPrivateProfile = inputsEdit.isPrivateAccount;
    }

    // if (inputsEdit.ProfileImage && inputsEdit.ProfileImage !== profileimage) {
        //     updates.profileimage = inputsEdit.ProfileImage;
        // }

    if(selectedFile) {
        const Form_Data = new FormData();
        Form_Data.append("file", selectedFile as File);
        Form_Data.append('upload_preset', 'ml_default');
        const res = await fetch("https://api.cloudinary.com/v1_1/dzih5telw/image/upload", {
            method: "POST",
            body: Form_Data,
        });
        const data = await res.json();
        const Imgae_Url = data.secure_url;
        updates.profileimage = Imgae_Url;
        setProfileImagePreview(null);
        setSelectedFile(null);
    }
    
    // If no actual changes
    if (Object.keys(updates).length === 0) {
        toast.info("No changes to update.");
        return;
    }
    try {
        await updateDoc(DocRef, updates);
        toast.success("Profile updated!");
        setIsOpenEditProfile(false);
        // onSnapshot will automatically update the context - no manual state update needed
    } catch (err) {
        console.error(err);
        toast.error("Update failed!");
    }
};

    if(!isOpenEditProfile) return null;


    let EditProfileTabs;
    switch (tabName) {
        case "links":
            EditProfileTabs = (
                <div
                    className=""
                >
                    {/* ---- Links Header ---- */}
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
                            onClick={HandleSaveLinks}
                            className="text-neutral-300 font-bold
                            cursor-pointer hover:text-neutral-100"
                        >
                            {isSaveLinksLoading ? (
                                <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin">
                                </div>
                            ) : "Done"}
                        </button>
                    </div>
                    {/* ---- Links Body ---- */}
                    <div
                        className="space-y-4 pt-4"
                    >
                        <div
                            className="border border-neutral-800 
                                rounded-xl flex flex-col items-center"
                        >
                            <div
                                className="w-full flex border-b border-neutral-800"
                            >
                                <input 
                                    className="w-full px-2 py-2 
                                        outline-none"
                                    type="text"
                                    placeholder="Add Label ex:'Google'"
                                    value={linksInput.label}
                                    onChange={(e) => setLinksInput({ ...linksInput, label: e.target.value })}
                                />
                                <button
                                    onClick={HandlePushLinks}
                                    className="disabled:text-neutral-700 cursor-pointer px-2 text-neutral-200 font-bold"
                                >
                                    Add
                                </button>
                            </div>
                            <input
                                className="w-full px-2 py-2 
                                    outline-none"
                                placeholder="Add Link ex:'Google.com'"
                                value={linksInput.link}
                                onChange={(e) => setLinksInput({ ...linksInput, link: e.target.value })}
                            />
                        </div>
                        <div
                            className={`w-full rounded-xl border-neutral-800
                                ${inputsEdit.Links.length > 0 && "border"}`}
                        >
                            {inputsEdit.Links.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={`flex items-center justify-between 
                                            text-neutral-500 py-2 px-2 border-neutral-800
                                            ${idx !== inputsEdit.Links.length -1 ? "border-b" : ""}`}
                                    >
                                        <div
                                            className="w-full flex items-center gap-2"
                                        >
                                            <Link2
                                                size={14} 
                                            />
                                            <a
                                                className=""
                                                href={item.link}
                                            >
                                                {item.label}
                                            </a>
                                        </div>
                                        <span
                                            onClick={() => HandleRemoveLink(idx)}
                                            className="cursor-pointer ml-2"
                                        >
                                            <CircleMinus 
                                                size={14}
                                            />
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
            break;
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
                            className="px-2 border border-neutral-800 rounded-xl 
                                flex items-center"
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
                            className={`w-full rounded-xl border-neutral-800
                                ${inputsEdit.Interests.length > 0 && "border"}`}
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
                                src={profileImagePreview ? profileImagePreview : profileimage}
                                alt=""
                                fill
                                className="object-cover"
                                defaultValue={name}
                            />
                            <div>
                                <label
                                    className="absolute left-4 bottom-2 z-50
                                        bg-black p-1 rounded-lg cursor-pointer 
                                        hover:bg-black/60"
                                    htmlFor="ChangeProfileImage"
                                >
                                    <Pen 
                                        size={16}
                                    />
                                </label>
                                <input 
                                    type="file" 
                                    className="hidden"
                                    onChange={HandleChangeUpdateProfile}
                                    name="" 
                                    id="ChangeProfileImage"
                                />
                            </div>
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
                        onClick={() => setTabName("links")}
                        className="w-full border-b border-neutral-800 pb-4
                            flex items-center cursor-pointer justify-between"
                    >
                        <h1
                            className="font-bold"
                        >
                            Links
                        </h1>
                        <span
                            className="flex items-center"
                        >
                            <p>{Links?.length}</p>
                            <ChevronRight size={20}/>
                        </span>
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