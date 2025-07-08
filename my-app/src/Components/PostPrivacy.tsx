'use client';

import { useEffect, useRef } from "react";




interface PostPrivacyProps {
    setIsVisibilityMenuOpen: (isOpen: boolean) => void;
    isVisibilityMenuOpen?: boolean;
    setSelectedVisibility: (isSelected: string) => void;
    selectedVisibility?: string;
}
const Visibiliities = [
  "anyone",
  "Profiles you follow",
  "Mentioned only"
]
export default function PostPrivacy({ setIsVisibilityMenuOpen, isVisibilityMenuOpen, setSelectedVisibility, selectedVisibility }: PostPrivacyProps) {
  const MenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const HideMenu = (e: MouseEvent) => {
      if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
        setIsVisibilityMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', HideMenu);
    return () => document.removeEventListener('mousedown', HideMenu);
  }, []);

  if(!selectedVisibility) return;
  return isVisibilityMenuOpen ? (
    <section
      ref={MenuRef}
      className="absolute z-50 left-0 bottom-0 w-48 bg-neutral-900 border 
                border-neutral-800 rounded-xl 
                shadow shadow-neutral-800 p-4"
    >
      <div className="space-y-2">
        {Visibiliities.map((item, index) => {
          return (
            <button 
              key={index}
              onClick={() => {
                setSelectedVisibility(item);
                setIsVisibilityMenuOpen(false);
              }}
              disabled={selectedVisibility.toLowerCase() === item.toLowerCase()}
              className={`w-full text-left px-2 py-2 
                rounded-xl 
                capitalize
                ${item.toLowerCase() === selectedVisibility.toLowerCase() ?
                "text-neutral-600 border border-neutral-800"
                :
                "hover:bg-neutral-800 cursor-pointer"}`}>
              {item}
            </button>
          )
        })}
      </div>
    </section>
  ) : null;
}
