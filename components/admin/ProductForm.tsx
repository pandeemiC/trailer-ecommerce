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
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
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
  const filteredSubcategories = subcategories.filter(
    (sc) => sc.category_id === categoryId,
  );

  const subcategoryOptions = filteredSubcategories.map((sc) => ({
    value: sc.id,
    label: sc.name,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !price || !categoryId) {
      setError("Name, price and category are required.");
      setLoading(false);
      return;
    }

    const formData = {
      name,
      price: parseFloat(price),
      description,
      category_id: categoryId,
      featured_type: featuredType || null,
      image: images[0]?.url ?? "",
      subcategory_ids: selectedSubcategories,
      gallery_images: images,
    };

    try {
      if (isEditing && product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      {error && (
        <p className="text-[11px] text-red-500 tracking-wider mb-4">{error}</p>
      )}
      {/* name */}
      <div className="mb-4">
        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
          Product Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="auth-input"
        />
      </div>

      {/* price */}

      <div className="mb-4">
        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
          Price
        </label>
        <input
          type="number"
          value={price}
          step="0.01"
          onChange={(e) => setPrice(e.target.value)}
          className="auth-input"
          required
        />
      </div>

      {/* desc */}
      <div className="mb-4">
        <label className="text-[10px] tracking-widest uppercase text-gray-400 block mb-1">
          Description
        </label>

        <textarea
          value={description}
          rows={4}
          className="auth-input resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* cat */}
      <div className="mb-4">
        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSelectedSubcategories([]);
          }}
          className="auth-input"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* subcat */}
      {categoryId && (
        <div className="mb-4">
          <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 block">
            Subcategories
          </label>
          <Select
            isMulti
            options={subcategoryOptions}
            value={subcategoryOptions.filter((opt) =>
              selectedSubcategories.includes(opt.value),
            )}
            onChange={(selected) =>
              setSelectedSubcategories(selected.map((s) => s.value))
            }
            placeholder="Select subcategories..."
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: 0,
                borderColor: "#e5e7eb",
                boxShadow: "none",
                minHeight: "42px",
                fontSize: "12px",
                letterSpacing: "0.05em",
                "&:hover": { borderColor: "#000" },
              }),
              option: (base, optionState) => ({
                ...base,
                fontSize: "12px",
                letterSpacing: "0.05em",
                backgroundColor: optionState.isFocused ? "#f3f4f6" : "white",
                color: "#000",
              }),
              placeholder: (base) => ({
                ...base,
                fontSize: "12px",
                color: "#9ca3af",
                letterSpacing: "0.05em",
              }),
            }}
          />
        </div>
      )}

      {/* featured type */}
      <div className="mb-8">
        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-1 block">
          Featured Type
        </label>
        <select
          value={featuredType}
          onChange={(e) => setFeaturedType(e.target.value)}
          className="auth-input"
        >
          <option value="">None</option>
          <option value="hero">Hero</option>
          <option value="featured">Featured</option>
          <option value="hero_bottom">Hero Bottom</option>
        </select>
      </div>

      {/* image */}
      <div className="mb-8">
        <label className="text-[10px] tracking-widest uppercase text-gray-400 mb-2 block">
          Product Images
        </label>
        <ImageUploader existingImages={images} onImagesChange={setImages} />
        <p className="text-[10px] text-gray-400 tracking-wider mt-2">
          The first image will be used as the main product image.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-[200px] py-3 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors cursor-pointer disabled:opacity-50"
      >
        {loading
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
            ? "Update Product"
            : "Create Product"}
      </button>
    </form>
  );
}
