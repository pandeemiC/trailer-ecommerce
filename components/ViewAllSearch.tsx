import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ViewAllSearch() {
  const [input, setInput] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <input
      type="text"
      placeholder="Search products"
      className="flex-1 border-b border-black/15 px-4 py-2.5 text-[11px] font-light tracking-widest uppercase outline-none placeholder:text-black/40"
    />
  );
}
