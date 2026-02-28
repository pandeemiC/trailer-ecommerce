"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { PiUploadSimpleLight, PiXLight } from "react-icons/pi";

interface UploadedImage {
  url: string;
  image_type: string;
  position: number;
}

interface ImageUploaderProps {
  existingImages?: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
}

export default function ImageUploader({
  existingImages = [],
  onImagesChange,
}: ImageUploaderProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<UploadedImage[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFiles = async (files: FileList | File[]) => {
    setUploading(true);
    const newImages: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) {
        console.error("Upload failed:", error.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      newImages.push({
        url: publicUrl,
        image_type: "gallery",
        position: images.length + newImages.length,
      });
    }

    const updated = [...images, ...newImages];
    setImages(updated);
    onImagesChange(updated);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index: number) => {
    const updated = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, position: i }));
    setImages(updated);
    onImagesChange(updated);
  };

  const handleTypeChange = (index: number, newType: string) => {
    const updated = images.map((img, i) =>
      i === index ? { ...img, image_type: newType } : img,
    );
    setImages(updated);
    onImagesChange(updated);
  };

  return (
    <div>
      {/* drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${dragOver ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"}`}
      >
        <PiUploadSimpleLight size={24} className="mx-auto mb-2 text-gray-400" />
        <p className="text-[12px] tracking-wider text-gray-400">
          {uploading
            ? "Uplading..."
            : "Drag & drop images here, or click to browse"}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              uploadFiles(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </div>

      {/* preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {images.map((img, index) => (
            <div key={img.url} className="relative group">
              <div className="relative w-full h-[120px]">
                <Image
                  src={img.url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <PiXLight size={12} />
              </button>

              {/* Image type selector */}
              <select
                value={img.image_type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
                className="w-full mt-1 text-[10px] tracking-wider border border-gray-200 py-1 px-1"
              >
                <option value="gallery">Gallery</option>
                <option value="hero">Hero</option>
                <option value="thumbnail">Thumbnail</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
