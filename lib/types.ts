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
