"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/admin/actions";
import { ProductWithSubcategories, Category, Subcategory } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import Select from "react-select";

interface UploadedImage {
  url: string;
  image_type: string;
  position: number;
}

interface ProductFormProps {
  product?: ProductWithSubcategories | null;
  categories: Category[];
  subcategories: Subcategory[];
}

export default function ProductForm({
  product,
  categories,
  subcategories,
}: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price?.toString());
  const [description, setDescription] = useState(product?.description ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [featuredType, setFeaturedType] = useState(
    product?.featured_type ?? "",
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    product?.product_subcategories?.map((ps) => ps.subcategory_id) ?? [],
  );
  const [images, setImages] = useState<UploadedImage[]>(
    product?.product_images?.map((img) => ({
      url: img.url,
      image_type: img.image_type,
      position: img.position,
    })) ?? [],
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // filter subcat by cat

  return <div>ProductForm</div>;
}
