'use client';

import { useEffect, useRef } from "react";




interface PostPrivacyProps {
    setIsMenuOpen: (isOpen: boolean) => void;
    isMenuOpen?: boolean;
}
export default function PostPrivacy({ setIsMenuOpen, isMenuOpen }: PostPrivacyProps) {
  const MenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const HideMenu = (e: MouseEvent) => {
      if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', HideMenu);
    return () => document.removeEventListener('mousedown', HideMenu);
  }, []);

  return isMenuOpen ? (
    <section
      ref={MenuRef}
      className="absolute z-50 left-0 bottom-0 w-48 bg-neutral-900 border 
                border-neutral-800 rounded-xl 
                shadow shadow-neutral-800 p-4"
    >
      <div className="space-y-2">
        <button className="w-full text-left p-2 hover:bg-neutral-800 rounded">
          Anyone
        </button>
        <button className="w-full text-left p-2 hover:bg-neutral-800 rounded">
          Profiles you follow
        </button>
        <button className="w-full text-left p-2 hover:bg-neutral-800 rounded">
          Mentioned only
        </button>
      </div>
    </section>
  ) : null;
}
