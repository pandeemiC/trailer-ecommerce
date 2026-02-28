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
  const fileInputRef = useRef<HTMLInputELement>(null);

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

  return (
    <div>
      <h1>Uploaded Images</h1>
    </div>
  );
}
