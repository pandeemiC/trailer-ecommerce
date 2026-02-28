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

  return (
    <div>
      <h1>Uploaded Images</h1>
    </div>
  );
}
