"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HomepageSection } from "@/lib/types";
import {
  createSection,
  updateSection,
  deleteSection,
  reorderSection,
} from "@/lib/admin/actions";

import {
  PiPencilSimpleLight,
  PiTrashLight,
  PiArrowUpLight,
  PiArrowDownLight,
  PiPlusLight,
} from "react-icons/pi";
import ImageUploader from "./ImageUploader";

interface ContentManagerProps {
  sections: HomepageSection[];
}

export default function ContentManager({ sections }: ContentManagerProps) {
  const router = useRouter();

  const [editingSection, setEditingSection] = useState<HomepageSection | null>(
    null,
  );
  const [isAdding, setIsAdding] = useState(false);

  const [sectionType, setSectionType] = useState<"duo" | "full" | "editorial">(
    "duo",
  );
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [textSide, setTextSide] = useState<"left" | "right">("left");
  const [sectionImages, setSectionImages] = useState<
    {
      url: string;
      alt: string;
      href: string;
      position: number;
      text_side: string | null;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this section?")) return;
    setLoading(true);

    try {
      await deleteSection(id);
      router.refresh();
    } catch (err) {
      console.error("Failed to delete section: ", err);
    }
    setLoading(false);
  };

  if (isAdding || editingSection) {
    return;
  }

  return (
    <div>
      <button
        onClick={() => {
          setIsAdding(true);
          setSectionType("duo");
          setTitle("");
          setSubtitle("");
          setDescription("");
          setSectionImages([]);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors cursor-pointer mb-8"
      >
        <PiPlusLight size={14} />
        Add Section
      </button>

      {/* section list */}
      <div className="border border-gray-200">
        {sections.length > 0 ? (
          sections.map((section, index) => (
            <div
              key={section.id}
              className="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-widest text-gray-400 w-6">
                  {section.position}
                </span>
                <span className="text-[10px] tracking-widest uppercase bg-gray-100 px-2 py-1">
                  {section.section_type}
                </span>
                <span className="text-[12px] tracking-wider">
                  {section.title ||
                    `${section.homepage_section_images.length} image(s)`}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* navigation buttons */}
                <button
                  onClick={() => handleMoveUp(section, index)}
                  disabled={index === 0 || loading}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer disabled:opacity-30"
                >
                  <PiArrowUpLight size={15} />
                </button>
                <button
                  onClick={() => handleMoveDown(section, index)}
                  disabled={index === sections.length - 1 || loading}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer disabled:opacity-30"
                >
                  <PiArrowDownLight size={15} />
                </button>
                {/* edit button */}
                <button
                  onClick={() => handleStartEdit(section)}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                >
                  <PiPencilSimpleLight size={15} />
                </button>
                {/* delete button */}
                <button
                  onClick={() => handleDelete(section)}
                  disabled={loading}
                  className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-600 cursor-pointer disabled:opacity-50"
                >
                  <PiTrashLight size={15} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-[12px] tracking-wider text-gray-400">
              No sections yet. Add your first homepage section.
            </p>
          </div>
        )}
      </div>

      <p className="text-[10px] tracking-wider text-gray-400 mt-4">
        {sections.length} section{sections.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
