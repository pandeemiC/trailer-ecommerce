export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id: string;
  featured_type: string | null;
  created_at: string;
  product_images: {
    id: string;
    product_id: string;
    url: string;
    image_type: string;
    position: number;
  }[];
};

export type GalleryImage = {
  id: string;
  url: string;
  image_type: string;
  position: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
};

export type AdminUser = {
  id: string;
  created_at: string;
};

export type ProductWithSubcategories = Product & {
  product_subcategories: { subcategory_id: string }[];
  categories?: { name: string };
};
