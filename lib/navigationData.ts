export type Category = keyof typeof navigationData;

export const navigationData = {
  WOMAN: {
    basePath: "/woman",
    image: "/category-img1.jpg",
    links: [
      { title: "VIEW ALL", href: "/search?category=woman" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "JACKETS", href: "jackets" },
      { title: "DRESSES", href: "dresses" },
      { title: "TOPS", href: "tops" },
      { title: "BOTTOMS", href: "bottoms" },
    ],
  },
  MAN: {
    basePath: "/man",
    image: "/category-img2.jpg",
    links: [
      { title: "VIEW ALL", href: "/search?category=man" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "JACKETS", href: "jackets" },
      { title: "LINEN", href: "linen" },
      { title: "TOPS", href: "tops" },
      { title: "BOTTOMS", href: "bottoms" },
    ],
  },
  KIDS: {
    basePath: "/kids",
    image: "/category-img3.jpg",
    links: [
      { title: "VIEW ALL", href: "/search?category=kids" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "GIRL | 6-14 YEARS", href: "girl" },
      { title: "BOY | 6-14 YEARS", href: "boy" },
    ],
  },
  HOME: {
    basePath: "/home",
    image: "/category-img4.jpg",
    links: [
      { title: "VIEW ALL", href: "/search?category=home" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "BEDDING", href: "bedding" },
      { title: "DECOR", href: "decor" },
      { title: "FURNITURE", href: "furniture" },
      { title: "KITCHEN", href: "kitchen" },
    ],
  },
  FRAGRANCE: {
    basePath: "/fragrance",
    image: "/category-img5.jpg",
    links: [
      { title: "VIEW ALL", href: "/search?category=fragrance" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "FOR HER", href: "for-her" },
      { title: "FOR HIM", href: "for-him" },
      { title: "UNISEX", href: "unisex" },
      { title: "GIFT SETS", href: "gift-sets" },
    ],
  },
} as const;

export const sortOptions = [
  { label: "Recommended", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
];

export const accountLinks = [
  {
    title: "My Purchases",
    href: "/account/purchases",
    icon: "PiShoppingBagLight",
  },
  { title: "My Details", href: "/account/details", icon: "PiUserLight" },
  { title: "Settings", href: "/account/settings", icon: "PiGearLight" },
  { title: "Help", href: "/account/help", icon: "PiQuestionLight" },
];

export const mockOrder = [
  {
    id: "ORD-2024-001847",
    date: "January 15, 2025",
    status: "Delivered",
    total: 289.97,
    items: [
      {
        name: "Wool Blend Overcoat",
        size: "M",
        color: "Black",
        quantity: 1,
        price: 189.99,
        image: "/orders/woolcoat.jpg",
      },
      {
        name: "Cashmere Scarf",
        size: "One Size",
        color: "Grey",
        quantity: 1,
        price: 49.99,
        image: "/orders/scarf.jpg",
      },
      {
        name: "Leather Belt",
        size: "85",
        color: "Brown",
        quantity: 1,
        price: 49.99,
        image: "/orders/belt.jpg",
      },
    ],
  },
  {
    id: "ORD-2024-002103",
    date: "February 2, 2025",
    status: "In Transit",
    total: 129.99,
    items: [
      {
        name: "Linen Blend Shirt",
        size: "L",
        color: "White",
        quantity: 2,
        price: 64.99,
        image: "/orders/linenshirt.jpg",
      },
    ],
  },
  {
    id: "ORD-2024-002250",
    date: "February 20, 2025",
    status: "Processing",
    total: 459.98,
    items: [
      {
        name: "Tailored Blazer",
        size: "M",
        color: "Navy",
        quantity: 1,
        price: 229.99,
        image: "/orders/blazer.jpg",
      },
      {
        name: "Pleated Trousers",
        size: "32",
        color: "Navy",
        quantity: 1,
        price: 229.99,
        image: "/orders/trousers.jpg",
      },
    ],
  },
];
