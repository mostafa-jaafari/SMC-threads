"use client";

import { useUserInfo } from "@/context/UserInfoContext";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { toast } from "sonner";


interface inputsEditTypes{
    Name: string;
    Bio: string;
    Interests: string[];
    isPrivateAccount: boolean;
}
export function EditProfile(){
    const { name, profileimage, profilebio, interests, isPrivateProfile } = useUserInfo();
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
    return (
        <section
            className="absolute left-0 top-0 bg-black/50 
                z-50 w-full h-screen flex flex-col items-center justify-start"
        >
            <div
                className="lg:hidden md:hidden w-full py-4 bg-[#101010] 
                    flex items-center justify-between px-6
                    border-b border-neutral-800"
            >
                <button
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
                    className="max-w-[600px] min-w-[400px] 
                        grow rounded-3xl border border-neutral-800 
                        bg-[#101010] p-6 space-y-4"
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
                                            className="text-neutral-300"
                                        >
                                            <Link
                                                href="/"
                                            >
                                                {item}
                                            </Link>
                                            <span
                                                className="pr-1"
                                                >
                                                {inputsEdit.Interests.length > 0 && idx !== inputsEdit.Interests.length - 1 ? "," : ""}
                                            </span>
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
                        className="w-full text-black font-bold 
                            hover:bg-neutral-300 bg-neutral-200 py-3
                            cursor-pointer rounded-xl flex justify-center"
                    >
                        Done
                    </button>
                </div>
                </div>
            </div>
        </section>
    )
}