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

  const handleMoveUp = async (section: HomepageSection, index: number) => {
    if (index === 0) return;
    setLoading(true);

    try {
      const prevSection = sections[index - 1];
      await reorderSection(section.id, prevSection.position);
      await reorderSection(prevSection.id, section.position);
      router.refresh();
    } catch (err) {
      console.error("Failed to reorder: ", err);
    }
    setLoading(false);
  };

  const handleMoveDown = async (section: HomepageSection, index: number) => {
    if (index === sections.length - 1) return;
    setLoading(true);

    try {
      const nextSection = sections[index + 1];
      await reorderSection(section.id, nextSection.position);
      await reorderSection(nextSection.id, section.position);
      router.refresh();
    } catch (err) {
      console.error("Failed to reorder ", err);
    }
    setLoading(false);
  };

  const handleStartEdit = (section: HomepageSection) => {
    setEditingSection(section);
    setSectionType(section.section_type);
    setTitle(section.title ?? "");
    setSubtitle(section.subtitle ?? "");
    setDescription(section.description ?? "");
    setSectionImages(
      section.homepage_section_images.map((img) => ({
        url: img.url,
        alt: img.alt,
        href: img.href,
        position: img.position,
        text_side: img.text_side,
      })),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      section_type: sectionType,
      title: sectionType === "editorial" ? title || null : null,
      subtitle: sectionType === "editorial" ? subtitle || null : null,
      description: sectionType === "editorial" ? description || null : null,
      images: sectionImages.map((img) => ({
        ...img,
        text_side: sectionType === "editorial" ? textSide : null,
      })),
    };

    try {
      if (editingSection) {
        await updateSection(editingSection.id, formData);
      } else {
        await createSection(formData);
      }
      setIsAdding(false);
      setEditingSection(null);
      router.refresh();
    } catch (err) {
      console.error("Failed to save section: ", err);
    }
    setLoading(false);
  };

  if (isAdding || editingSection) {
    return (
      <div className="max-w-2xl">
        <h2 className="text-[13px] tracking-[0.2em] uppercase mb-6">
          {editingSection ? "Edit Section" : "Add Section"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
              Section Type
            </label>
            <select
              value={sectionType}
              onChange={(e) =>
                setSectionType(e.target.value as "duo" | "full" | "editorial")
              }
              className="auth-input"
            >
              <option value="duo">Duo (Two Images Side by Side)</option>
              <option value="full">Full (Full Single Image)</option>
              <option value="editorial">Editorial (Images + Text)</option>
            </select>
          </div>

          {sectionType === "editorial" && (
            <>
              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The BOFA Collection Edit"
                  className="auth-input"
                />
              </div>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
                  Subtitle
                </label>
                <input
                  type="text"
                  placeholder="Photography by Me"
                  className="auth-input"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summer BOFA Collection of 2026"
                  className="auth-input"
                />
              </div>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
                  Text Side
                </label>
                <select
                  value={textSide}
                  onChange={(e) =>
                    setTextSide(e.target.value as "left" | "right")
                  }
                  className="auth-input"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </>
          )}
          {/* imgs */}
          <div className="mb-4">
            <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
              Images
            </label>
            <ImageUploader
              existingImages={sectionImages.map((img, i) => ({
                url: img.url,
                image_type: "section",
                position: i,
              }))}
              onImagesChange={(uploaded) => {
                setSectionImages(
                  uploaded.map((img, i) => ({
                    url: img.url,
                    alt: sectionImages[i]?.alt ?? "",
                    href: sectionImages[i]?.href ?? "",
                    position: i + 1,
                    text_side: sectionType === "editorial" ? textSide : null,
                  })),
                );
              }}
            />
          </div>
          {/* alt and href field per img */}
          {sectionImages.map((img, index) => (
            <div
              key={index}
              className="grid grid-cols-2 mb-4 pl-4 border-l-2 border-gray-200 dark:border-neutral-600"
            >
              <div>
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
                  Image {index + 1} Alt Text
                </label>
                <input
                  type="text"
                  placeholder="Perfume Model"
                  className="auth-input"
                  value={img.alt}
                  onChange={(e) => {
                    const updated = [...sectionImages];
                    updated[index] = { ...updated[index], alt: e.target.value };
                    setSectionImages(updated);
                  }}
                />
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
                  Image {index + 1} Link
                </label>
                <input
                  type="text"
                  value={img.href}
                  onChange={(e) => {
                    const updated = [...sectionImages];
                    updated[index] = {
                      ...updated[index],
                      href: e.target.value,
                    };
                    setSectionImages(updated);
                  }}
                  className="auth-input"
                  placeholder="/fragrance"
                />
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-[11px] tracking-widest uppercase hover:bg-black/80 dark:hover:bg-white/80 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingSection
                  ? "Update Section"
                  : "Create Section"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingSection(null);
              }}
              className="px-6 py-3 border border-gray-200 dark:border-neutral-600 text-[11px] tracking-widest uppercase cursor-pointer hover:border-black dark:hover:border-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
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
        className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-[11px] tracking-widest uppercase hover:bg-black/80 dark:hover:bg-white/80 transition-colors cursor-pointer mb-8"
      >
        <PiPlusLight size={14} />
        Add Section
      </button>

      {/* section list */}
      <div className="border border-gray-200 dark:border-neutral-700">
        {sections.length > 0 ? (
          sections.map((section, index) => (
            <div
              key={section.id}
              className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-neutral-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-widest text-gray-400 w-6">
                  {section.position}
                </span>
                <span className="text-[10px] tracking-widest uppercase bg-gray-100 dark:bg-neutral-700 px-2 py-1">
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
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded transition-colors cursor-pointer disabled:opacity-30"
                >
                  <PiArrowUpLight size={15} />
                </button>
                <button
                  onClick={() => handleMoveDown(section, index)}
                  disabled={index === sections.length - 1 || loading}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded transition-colors cursor-pointer disabled:opacity-30"
                >
                  <PiArrowDownLight size={15} />
                </button>
                {/* edit button */}
                <button
                  onClick={() => handleStartEdit(section)}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded transition-colors cursor-pointer"
                >
                  <PiPencilSimpleLight size={15} />
                </button>
                {/* delete button */}
                <button
                  onClick={() => handleDelete(section.id)}
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
