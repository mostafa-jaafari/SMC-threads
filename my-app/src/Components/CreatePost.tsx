'use client';

import { useCreatePost } from "@/context/CreatePostContext";
import { AlignLeft, CalendarClock, ChevronRight, ImagePlay, Images, MapPin, Smile, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AddTopic from "./AddTopic";
import { useAddTopic } from "@/context/AddTopicContext";


export default function CreatePost() {
    
    const { selectedTopic , setSelectedTopic} = useAddTopic();
    const [Inputs, setInputs] = useState({
        whatisnew: "",
    })
    // -------- File Selected ---------
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [prevImageUrl, setPrevImageUrl] = useState<string | null>(null)
    const InputFileRef = useRef<HTMLInputElement | null>(null);
    const HandleUploadImageBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if(!file) return;
        const objectUrl = URL.createObjectURL(file);
        setPrevImageUrl(objectUrl)
        setSelectedFile(file)
    }
    const HandleIconClick = () => {
        InputFileRef.current?.click();
    }
    useEffect(() => {
        return () => {
            if (prevImageUrl) {
            URL.revokeObjectURL(prevImageUrl);
            }
        };
    }, [prevImageUrl]);
    const session = useSession();
    const First_Letter = session?.data?.user?.name?.charAt(0).toUpperCase() || "";
    const PostMenuRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (PostMenuRef.current && !PostMenuRef.current.contains(event.target as Node)) {
                setIsCreatePostOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[])
    const { isCreatePostOpen, setIsCreatePostOpen, HandleCreatePost, isLoadingCreatePost, isFinishCreatingPost, setIsFinishCreatingPost } = useCreatePost();
    useEffect(() => {
        if(isFinishCreatingPost){
            setPrevImageUrl(null);
            setInputs({
                whatisnew: '',
            })
            setIsCreatePostOpen(false)
            if(setSelectedTopic) setSelectedTopic("")
        if(!setIsFinishCreatingPost) return;
            setIsFinishCreatingPost(false);
        }
    },[isLoadingCreatePost, isFinishCreatingPost])
    if(!isCreatePostOpen) return null;
    const HandleCreateNewPost = () => {
        if(!HandleCreatePost) return;
        HandleCreatePost(Inputs.whatisnew, selectedTopic ?? "", selectedFile);
    }

    return (
        <main 
            className="fixed top-0 left-0 w-full 
                h-screen bg-black/30 flex justify-center items-center">
            <section 
                ref={PostMenuRef}
                className="w-[90%] max-h-[60vh] overflow-y-auto sm:w-2/3 md:w-2/3 lg:w-1/2 
                    bg-neutral-900 lg:h-max md:h-max sm:h-max
                    border border-neutral-700 rounded-xl z-50">
                <div 
                    className="py-2 px-6 flex items-center 
                        justify-between border-b border-neutral-700">
                    <button
                        className="text-neutral-500 cursor-pointer 
                            border border-neutral-700 rounded-lg 
                            py-1 px-2 hover:text-neutral-400 
                            transition-all duration-300"
                        onClick={() => setIsCreatePostOpen(false)}
                    >
                        Cancel
                    </button>
                    <h1 className="lg:text-xl md:text-xl text-neutral-300">
                        Create Post
                    </h1>
                    <span className="cursor-pointer text-neutral-300 hover:text-white">
                        <CalendarClock size={26} />
                    </span>
                </div>
                <section className="w-full flex gap-4 p-6">
                    <div className="flex gap-1 flex-col justify-between items-center">
                        <div 
                            className="relative w-12 h-12 flex-shrink-0 rounded-full 
                                overflow-hidden border border-neutral-600">
                                    {session?.data?.user?.image ? (
                                        <Image 
                                            src={session?.data?.user?.image}
                                            alt="User Profile"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span 
                                            className="h-full w-full text-xl font-semibold 
                                                bg-neutral-800 flex flex-col justify-center 
                                                items-center rounded-full overflow-hidden">
                                            {First_Letter}
                                        </span>
                                    )}
                        </div>
                        <span className="border-l-2 border-neutral-800 h-full">
                        </span>
                        <div 
                            className="relative w-6 h-6 flex-shrink-0
                                rounded-full overflow-hidden border border-neutral-600">
                                    {session?.data?.user?.image ? (
                                    <Image 
                                        src={session?.data?.user?.image}
                                        alt="User Profile"
                                        fill
                                        className="object-cover"
                                    />
                                    ) : (
                                        <span 
                                            className="h-full w-full
                                                flex flex-col justify-center 
                                                items-center bg-neutral-800 rounded-full 
                                                overflow-hidden text-white">
                                            {First_Letter}
                                        </span>
                                    )}
                        </div>
                    </div>
                    <div className="space-y-4 w-full">
                        <span className="flex items-end gap-1">
                            <h1 className="text-neutral-300 text-nowrap">
                                {session?.data?.user?.name}
                            </h1>
                            <ChevronRight size={18} className="text-neutral-600" />
                            <AddTopic />
                        </span>
                        <textarea 
                            name="whatisnew"
                            value={Inputs.whatisnew}
                            onChange={(e) =>
                                setInputs({ ...Inputs, whatisnew: e.target.value })
                            }
                            id=""
                            autoFocus
                            placeholder="What's new?"
                            className="fs-content focus:outline-none text-sm 
                                placeholder:font-normal font-semibold 
                                text-neutral-500 border-none w-full"
                        />
                        {prevImageUrl && (
                            <div
                                className="group relative w-full h-80 rounded-xl border 
                                    border-neutral-700 overflow-hidden bg-neutral-800"
                            >
                                <Image 
                                    src={prevImageUrl || "" as string}
                                    alt="Post Image"
                                    fill
                                    className="object-contain"
                                />
                                <X 
                                    size={20}
                                    onClick={() => setPrevImageUrl(null)}
                                    className="group-hover:flex hidden cursor-pointer 
                                        transition-all duration-300 text-neutral-500 
                                        hover:text-neutral-300 absolute right-2 top-2"
                                />
                            </div>
                        )}
                        <ul 
                            className="w-full flex items-center 
                                gap-5 py-1">
                                    <input 
                                        ref={InputFileRef}
                                        type="file" 
                                        onChange={HandleUploadImageBtn}
                                        name="" 
                                        id=""
                                        className="hidden"
                                    />
                            <Images 
                                onClick={HandleIconClick} 
                                size={20} 
                                className="text-neutral-600 
                                    hover:text-neutral-500 cursor-pointer"
                            />
                            <ImagePlay 
                                size={20} 
                                className="text-neutral-600 
                                    cursor-not-allowed hover:text-neutral-500"
                            />
                            <Smile 
                                size={20} 
                                className="text-neutral-600 
                                    cursor-not-allowed hover:text-neutral-500"
                            />
                            <AlignLeft 
                                size={20} 
                                className="text-neutral-600 
                                    cursor-not-allowed hover:text-neutral-500"
                            />
                            <MapPin 
                                size={20} 
                                className="text-neutral-600 
                                cursor-not-allowed hover:text-neutral-500"
                            />
                        </ul>
                        <div className="flex items-center gap-2">
                            <input 
                                type="text" 
                                name="" 
                                id=""
                                placeholder="Add a comment..."
                                className="focus:outline-none text-sm 
                                    placeholder:font-normal font-semibold 
                                    text-neutral-500 border-none w-full bg-transparent"
                            />
                        </div>
                    </div>
                </section>
                    {/* ---------- */}

                    <div className="px-10 py-2 flex items-center 
                        justify-between border-t border-neutral-800">
                        <button 
                            className="text-neutral-600 
                                hover:text-neutral-500 transition-all 
                                cursor-pointer duration-300">
                            Anyone can reply & quote
                        </button>
                        <button 
                            onClick={HandleCreateNewPost}
                            disabled={Inputs.whatisnew === "" || isLoadingCreatePost}
                            className={`border border-neutral-800 
                                py-1 px-4 rounded-lg hover:bg-neutral-800 
                                hover:border-neutral-700 
                                transition-all duration-300 flex items-center justify-center
                                ${isLoadingCreatePost ? "cursor-not-allowed bg-neutral-800 text-neutral-700" 
                                :
                                "cursor-pointer disabled:text-neutral-700 disabled:cursor-not-allowed disabled:hover:bg-transparent"}`}>
                            {isLoadingCreatePost ? (
                                <span className="w-6 h-6 border-2 border-transparent border-t-current rounded-full animate-spin" />
                            ) : (
                                "Post"
                            )}
                        </button>
                    </div>
            </section>
        </main>
    )
}