'use client';

import { useAddTopic } from "@/context/AddTopicContext";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Topics = [
    "Sport",
    "Reading",
    "Technology",
    "Music",
    "Travel",
    "Cooking",
    "Art",
    "Science",
    "Movies",
    "Fitness",
    "Others"
];
export default function AddTopic() {
    const { openTopicMenu, selectedTopic, setOpenTopicMenu, setSelectedTopic } = useAddTopic();
    const [isOther, setIsOther] = useState(false);
    const AddTopicMenuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const HideMenu = (e : MouseEvent) => {
            if(setOpenTopicMenu && AddTopicMenuRef.current && !AddTopicMenuRef.current.contains(e.target as Node)){
                setOpenTopicMenu(false)
            }
        }
        document.addEventListener('mousedown', HideMenu);
        return () => document.removeEventListener('mousedown', HideMenu);
    }, [])
    return (
        <section>
            {isOther ? (
                <div className="w-full flex items-center px-2 gap-2 border border-neutral-800 rounded-lg">
                    <input 
                        type="text" 
                        autoFocus
                        onChange={(e) => setSelectedTopic && setSelectedTopic(e.target.value)}
                        className="w-40 border-none outline-none 
                            text-neutral-400 placeholder:text-neutral-700"
                        placeholder="write topic here..." />
                        <X 
                            onClick={() => {
                                setIsOther(false)
                                if (setSelectedTopic) setSelectedTopic("")
                            }}
                            size={16} 
                            className="text-neutral-600 
                                cursor-pointer hover:text-neutral-400"/>
                </div>
            ) : selectedTopic === "" ? (
                <button 
                    onClick={() => setOpenTopicMenu && setOpenTopicMenu(!openTopicMenu)}
                    className="text-neutral-600 text-sm hover:text-neutral-500 
                    transition-all duration-300 cursor-pointer">
                    Add a topic
                </button>
                ) : (
                    <button 
                        onClick={() => setOpenTopicMenu && setOpenTopicMenu(!openTopicMenu)}
                        className="px-2 cursor-pointer hover:border-neutral-500 flex items-center justify-between border 
                            min-w-24 rounded-lg gap-1 border-neutral-700 text-neutral-400">
                        {selectedTopic} 
                        <span className="pl-1 border-l border-neutral-700">
                            <X 
                                onClick={() => setSelectedTopic && setSelectedTopic("")}
                                size={16} 
                                className="text-neutral-600 
                                    cursor-pointer hover:text-neutral-400"/>
                        </span>
                    </button>
                )}
            {openTopicMenu && (
                <div 
                    ref={AddTopicMenuRef}
                    className="absolute bottom-32 bg-black w-48 h-60 overflow-y-auto rounded-lg 
                        overflow-hidden border border-neutral-800">
                    {Topics.map((topic, index) => {
                        return (
                            <li 
                                key={index}
                                onClick={topic.toLowerCase() !== "others" ? () => {
                                    if (setSelectedTopic) setSelectedTopic(topic);
                                    if(setOpenTopicMenu) setOpenTopicMenu(false);
                                } : () => {
                                    setIsOther(true);
                                    if(setOpenTopicMenu) setOpenTopicMenu(false);
                                }}
                                className={`list-none py-1 px-4
                                    hover:bg-neutral-900 cursor-pointer 
                                    border-b border-neutral-900
                                    ${topic.toLowerCase() === "others" ? "text-center bg-neutral-900/40 text-neutral-300 hover:text-neutral-400" : "text-neutral-600 hover:text-neutral-300"}`}
                            >
                                {topic}
                            </li>
                        )
                    })}
                </div>
            )}
        </section>
    )
}