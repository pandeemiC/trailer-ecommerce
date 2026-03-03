"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Subcategory } from "@/lib/types";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "@/lib/admin/actions";

import { PiPencilSimpleLight, PiTrashLight } from "react-icons/pi";

interface CategoryManagerProps {
  categories: Category[];
  subcategories: Subcategory[];
}

export default function CategoryManager({
  categories,
  subcategories,
}: CategoryManagerProps) {
  const router = useRouter();

  // states
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<
    string | null
  >(null);
  const [editingSubcategoryName, setEditingSubcategoryName] = useState("");

  const [loading, setLoading] = useState(false);

  const filteredSubcategories = subcategories.filter(
    (sc) => sc.category_id === selectedCategoryId,
  );

  //cat handler
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setLoading(true);

    try {
      await createCategory(newCategoryName.trim());
      setNewCategoryName("");
      router.refresh();
    } catch (err) {
      console.error("Failed to create category: ", err);
    }
    setLoading(false);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategoryId || !editingCategoryName.trim()) return;
    setLoading(true);

    try {
      await updateCategory(editingCategoryId, editingCategoryName.trim());
      setEditingCategoryId(null);
      setEditingCategoryName("");
      router.refresh();
    } catch (err) {
      console.error("Failed to update category: ", err);
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id: string) => {
    if (
      !confirm(
        "Delete this category? All its subcategories will also be removed.",
      )
    )
      return;
    setLoading(true);

    try {
      await deleteCategory(id);
      if (selectedCategoryId === id) setSelectedCategoryId(null);
      router.refresh();
    } catch (err) {
      console.error(" Failed to delete category: ", err);
    }
    setLoading(false);
  };

  // subcat handler
  const handleAddSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubcategoryName.trim() || !selectedCategoryId) return;
    setLoading(true);

    try {
      await createSubcategory(newSubcategoryName.trim(), selectedCategoryId);
      setNewSubcategoryName("");
      router.refresh();
    } catch (err) {
      console.error("Failed to create new subcategory: ", err);
    }
    setLoading(false);
  };

  const handleUpdateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubcategoryId || !editingSubcategoryName.trim()) return;
    setLoading(true);

    try {
      await updateSubcategory(
        editingSubcategoryId,
        editingSubcategoryName.trim(),
      );
      setEditingSubcategoryId(null);
      setEditingSubcategoryName("");
      router.refresh();
    } catch (err) {
      console.error("Failed to update subcategory: ", err);
    }
    setLoading(false);
  };

  const handleDeleteSubcategory = async (id: string) => {
    if (!confirm("Delete this subcategory?")) return;
    setLoading(true);

    try {
      await deleteSubcategory(id);
      router.refresh();
    } catch (err) {
      console.error("Failed to delete subcategory: ", err);
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* left cat */}
      <div>
        <h2 className="text-[13px] tracking-[0.2em] uppercase mb-4">
          Categories
        </h2>

        {/* adding cat */}
        <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newCategoryName}
            placeholder="New Category Name.."
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="auth-input flex-1"
          />
          <button
            type="submit"
            disabled={loading || !newCategoryName.trim()}
            className="px-4 py-2 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            Add
          </button>
        </form>

        {/* cat list */}
        <div className="border border-gray-200">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat.id}
                className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${selectedCategoryId === cat.id ? "bg-gray-50 border-l-2 border-l-black" : "hover:bg-gray-50"}`}
              >
                {editingCategoryId === cat.id ? (
                  <form
                    onSubmit={handleUpdateCategory}
                    className="flex gap-2 flex-1"
                  >
                    <input
                      type="text"
                      value={editingCategoryName}
                      onChange={(e) => setEditingCategoryName(e.target.value)}
                      className="auth-input flex-1"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="p-3 py-1 bg-black text-white text-[10px] transition-colors tracking-widest cursor-pointer disabled:opacity-50 uppercase"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCategoryId(null)}
                      className="px-3 py-1 border border-gray-200 text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`text-[12px] tracking-wider text-left flex-1 cursor-pointer ${selectedCategoryId === cat.id ? "font-medium" : ""}`}
                    >
                      {cat.name}
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingCategoryId(cat.id);
                          setEditingCategoryName(cat.name);
                        }}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                      >
                        <PiPencilSimpleLight size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        disabled={loading}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      >
                        <PiTrashLight size={15} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-[12px] tracking-wider text-gray-400">
                No categories yet..
              </p>
            </div>
          )}
        </div>

        <p className="text-[10px] tracking-wider text-gray-400 mt-4">
          {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
        </p>
      </div>

      {/* right subcat */}
      <div>
        {selectedCategoryId ? (
          <>
            <h2 className="text-[13px] tracking-[0.2em] uppercase mb-4">
              SubCategories
              <span className="text-gray-400 font-normal ml-2">
                {" "}
                - {categories.find((c) => c.id === selectedCategoryId)?.name}
              </span>
            </h2>

            {/* add subcat */}
            <form onSubmit={handleAddSubcategory} className="flex gap-2 mb-6">
              <input
                type="text"
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                value={newSubcategoryName}
                placeholder="New subcategory name.."
                className="auth-input flex-1"
              />
              <button
                type="submit"
                disabled={loading || !newSubcategoryName.trim()}
                className="px-4 py-2 bg-black text-white text-[11px] tracking-widest uppercase hover:bg-black/80 transition-colors cursor-pointer disabled:opacity-50"
              >
                Add
              </button>
            </form>

            {/* subcat list */}
            <div className="border border-gray-200">
              {filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((sc) => (
                  <div
                    key={sc.id}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    {editingSubcategoryId === sc.id ? (
                      <form
                        onSubmit={handleUpdateSubcategory}
                        className="flex gap-2 flex-1"
                      >
                        <input
                          type="text"
                          value={editingSubcategoryName}
                          onChange={(e) =>
                            setEditingSubcategoryName(e.target.value)
                          }
                          autoFocus
                          className="auth-input flex-1"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-3 py-1 bg-black text-white text-[10px] tracking-widest uppercase cursor-pointer disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingSubcategoryId(null)}
                          className="px-3 py-1 border border-gray-200 text-[10px] tracking-widest uppercase cursor-pointer"
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <span className="text-[12px] tracking-wider">
                          {sc.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingSubcategoryId(sc.id);
                              setEditingSubcategoryName(sc.name);
                            }}
                          >
                            <PiPencilSimpleLight size={15} />{" "}
                          </button>
                          <button
                            onClick={() => handleDeleteSubcategory(sc.id)}
                            disabled={loading}
                            className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-600 cursor-pointer disabled:opacity-50"
                          >
                            <PiTrashLight size={15} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-[12px] tracking-wider text-gray-400">
                    No subcategories yet.
                  </p>
                </div>
              )}
            </div>

            <p className="text-[10px] tracking-wider text-gray-400 mt-4">
              {filteredSubcategories.length} subcategor
              {filteredSubcategories.length !== 1 ? "ies" : "y"}
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[12px] tracking-wider text-gray-400">
              Select a category to manage its subcategories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
