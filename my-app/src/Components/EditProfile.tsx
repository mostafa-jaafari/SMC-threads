"use client";

import { useUserInfo } from "@/context/UserInfoContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface inputsEditTypes{
    Name: string;
    Bio: string;
    Interests: string[];
}
export function EditProfile(){
    const { name, profileimage, profilebio, interests } = useUserInfo();
    const [inputsEdit, setInputsEdit] = useState<inputsEditTypes>({
        Name: "",
        Bio: "",
        Interests: [],
    });

    useEffect(() => {
    if (name || profileimage || profilebio || interests) {
        setInputsEdit(({ 
            Name: name,
            Bio: profilebio || "",
            Interests: interests || [],
        }));
    }
    }, [name, profileimage, profilebio, interests]);
    return (
        <section
            className="absolute left-0 top-0 bg-black/50 
                z-50 w-full h-screen flex items-start 
                justify-center py-10"
        >
            <div
                className="lg:w-1/2 min-h-80 rounded-3xl border
                border-neutral-800 bg-[#101010] p-6 space-y-4"
            >
                <div
                    className="flex items-end gap-4"
                >
                    <div
                        className="w-full border-b border-neutral-700
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
                    className="w-full border-b border-neutral-700
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
                    className="w-full border-b border-neutral-700
                                flex flex-col pb-4"
                >
                    {/* <div> */}
                        <label 
                            htmlFor="Interests"
                        >
                            Interests
                        </label>
                        <div
                            className="w-full flex"
                        >
                            {inputsEdit.Interests.map((item, idx) => {
                                return (
                                    <Link
                                        href="/"
                                        key={idx}
                                    >
                                        {item}
                                    </Link>
                                )
                            })}
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </section>
    )
}