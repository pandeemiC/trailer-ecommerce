"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleSubmit() {
    if (input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
      setIsOpen(false);
      setInput("");
    }
  }

  return (
    <div className="relative flex items-center">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="cursor-pointer bg-white dark:bg-neutral-700 px-3 py-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      )}

      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white dark:bg-neutral-700 overflow-hidden transition-all duration-300 ${
          isOpen ? "w-[280px] opacity-100 p-2 rounded-lg" : "w-0 opacity-0"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Search"
          className="w-full text-[11px] font-light tracking-widest uppercase outline-none border-b border-black/30 dark:border-white/30 dark:text-white bg-transparent pb-1 pl-2 pr-8"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button
          onClick={() => {
            setIsOpen(false);
            setInput("");
          }}
          className="absolute right-1 text-[11px] font-light cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
